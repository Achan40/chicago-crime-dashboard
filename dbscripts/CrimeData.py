import requests
import json
import pandas as pd
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

    # create the corecrimedata table
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
                if row.Index % 100 == 0:
                    print(row.Index)
            except:
                print(row)
                pass
        self.con.commit()

    # create the commareas table (no api for this dataset, must upload via csv)
    # commareas describest the community areas of chicago, generally a static dataset
    def create_commareas(self):
        create_commareas_table_query = """
        CREATE TABLE commareas (
            community_area INT,
            community_desc TEXT
        )
        """
        self.cur.execute(create_commareas_table_query)
        self.con.commit()

    # load the csv file from https://data.cityofchicago.org/api/views/igwz-8jzy/rows.csv?accessType=DOWNLOAD&bom=true&format=true into a dataframe and use it as an input
    def insert_commareas(self,df):
        insert_commareas = """
        INSERT INTO commareas (
            community_area,
            community_desc
        )
        VALUES (%s,%s)
        ON DUPLICATE KEY UPDATE
            community_area=VALUES(community_area),
            community_desc=VALUES(community_desc)
        """
        for row in df.itertuples():
            data = (
                row.AREA_NUMBE,
                row.COMMUNITY,
                )
            try:
                self.cur.execute(insert_commareas,data)
            except:
                print(row)
                pass
        self.con.commit()

    

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

        # Drop location column since each entry is a dictionary, mysql db doesn't like this datatype
        # also rare edge case if there is no "location" column, json format field won't appear if nan
        try:
            data.drop(columns=['location'], inplace=True)
        except:
            pass
            
        # Turn NaN to none, because mysql won't insert NaN
        data = data.where(pd.notnull(data), None)

        return data

    # Get most recent updated_on entry from database
    def most_recent_update_on_corecrimedata(self):
        update_on_query = "SELECT MAX(updated_on) FROM corecrimedata"
        result = None
        try:
            self.cur.execute(update_on_query)
            result = self.cur.fetchall()
        except Exception as e:
            print(e)
        # returns the a datetime object, y-m-d
        return result[0][0].date()


    # Get updated data from Socrata API
    def get_corecrimedata_updates(self,timestamp,limit):
        # String literal, pull all available data from API for some time frame
        url = f'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=updated_on >= \'{timestamp}\' &$order=date ASC&$limit={limit}'
        # Using our app token
        headers = {'Accept': 'application/json', 'X-App-Token': APP_TOKEN}
        resp = requests.get(url,headers=headers)
        df = json.loads(resp.text)

        # Load data into a pandas dataframe
        data = pd.DataFrame(df)

        return data

    # close the connection, should always be done when we are finished with the object
    def close(self):
        self.con.close()
        self.cur.close()