from mysql.connector import connection
import requests
import json
import pandas as pd
import mysql.connector
from mysql.connector import connect, Error

# local files containing credentials
from apicreds import APP_TOKEN
from dbcreds import HOST,PORT,USER,PASSWORD,DATABASE

# class we can use to retrieve data from the chicago crime data api, as well load data into our database
class CrimeData:

    def __init__(self):

        # create connection database
        # if a database has not yet been created, delete the database=DATABASE arg and run the create_database method
        try:
            self.con = connect(host=HOST,user=USER,password=PASSWORD,database=DATABASE)
            self.cur = self.con.cursor()
            print(self.con)
        except Error as e:
            print(e)
    
    # create a database where we can store our tables
    # really only need to use this function once
    def create_database(self, dbname):
        self.cur.execute("CREATE DATABASE " + dbname)

    # create the corecrime data table
    def create_corecrimedata(self):
        create_corecrime_table_query = """
        CREATE TABLE corecrimedata (
            id VARCHAR(100) PRIMARY KEY,
            case_number TEXT,
            date DATETIME,
            block TEXT,
            iucr TEXT,
            primary_type TEXT,
            description TEXT,
            location_description TEXT,
            arrest TINYINT,
            domestic TINYINT,
            beat TEXT,
            district TEXT,
            ward TEXT,
            community_area INT,
            fbi_code TEXT,
            x_coordinate TEXT,
            y_coordinate TEXT,
            year INT,
            updated_on DATETIME,
            latitude TEXT,
            longitude TEXT
        )"""
        self.cur.execute(create_corecrime_table_query)
        self.con.commit()

    # use get_bulk_crime_data or ____to get the df to pass into this method
    def insert_corecrimedata(self, df):
        insert_corecrime = """
        INSERT INTO corecrimedata (
            id,
            case_number,
            date,
            block,
            iucr,
            primary_type,
            description,
            location_description,
            arrest,
            domestic,
            beat,
            district,
            ward,
            community_area,
            fbi_code,
            x_coordinate,
            y_coordinate,
            year,
            updated_on,
            latitude,
            longitude
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        ON DUPLICATE KEY UPDATE
            case_number=VALUES(case_number),
            date=VALUES(date),
            block=VALUES(block),
            iucr=VALUES(iucr),
            primary_type=VALUES(primary_type),
            description=VALUES(description),
            location_description=VALUES(location_description),
            arrest=VALUES(arrest),
            domestic=VALUES(domestic),
            beat=VALUES(beat),
            district=VALUES(district),
            ward=VALUES(ward),
            community_area=VALUES(community_area),
            fbi_code=VALUES(fbi_code),
            x_coordinate=VALUES(x_coordinate),
            y_coordinate=VALUES(y_coordinate),
            year=VALUES(year),
            updated_on=VALUES(updated_on),
            latitude=VALUES(latitude),
            longitude=VALUES(longitude)
        """
        for row in df.itertuples():
            data = (
                row.id,
                row.case_number,
                row.date,
                row.block,
                row.iucr,
                row.primary_type,
                row.description,
                row.location_description,
                row.arrest,
                row.domestic,
                row.beat,
                row.district,
                row.ward,
                row.community_area,
                row.fbi_code,
                row.x_coordinate,
                row.y_coordinate,
                row.year,
                row.updated_on,
                row.latitude,
                row.longitude
                )
            try:
                self.cur.execute(insert_corecrime,data)
            except:
                print(row)
                pass
        self.con.commit()

    # close the connection, should always be done when we are finished with the object
    def close(self):
        self.con.close()
        self.cur.close()

    # Retreive data from Socrata API
    def get_bulk_crime_data(self, startyear, endyear, limit='1000000'):
        # String literal, pull all available data from API for some time frame
        url = f'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=year<={endyear} AND year >= {startyear}&$order=date ASC&$limit={limit}'
        # Using our app token
        headers = {'Accept': 'application/json', 'X-App-Token': APP_TOKEN}
        resp = requests.get(url,headers=headers)
        df = json.loads(resp.text)

        # Load data into a pandas dataframe
        data = pd.DataFrame(df)

        # Some typecasting
        # data['date'] = pd.to_datetime(data['date'], errors='coerce')
        # data['updated_on'] = pd.to_datetime(data['updated_on'], errors='coerce')
        # data['year'] = pd.to_datetime(data['year'], errors='coerce')
        data['community_area'] = pd.to_numeric(data['community_area'], downcast='integer',errors='coerce')

        # Location is dropped since each row is a dictionary, mysql db doesn't like this
        # also rare edge case if there is no "location" column, json format field won't appear if nan
        try:
            data.drop(columns=['location'], inplace=True)
        except:
            pass
            
        # Turn NaN to none, because mysql won't insert NaN
        data = data.where(pd.notnull(data), None)

        return data