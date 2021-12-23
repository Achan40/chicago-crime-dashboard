import requests
import json
import pandas as pd
import pymysql
from sqlalchemy import create_engine

# local files containing credentials
from apicreds import APP_TOKEN
from dbcreds import HOST,PORT,USER,PASSWORD,DATABASE

# class we can use to retrieve data from the chicago crime data api, as well load data into our database
class CrimeData:

    def __init__(self):

        # create engine for database connection
        self.mydb = create_engine('mysql+pymysql://' + USER + ':' + PASSWORD + '@' + HOST + ':' + str(PORT) + '/' + DATABASE, echo=False)

    # Retreive data from Socrata API
    def get_crime_data(self, startyear, endyear, limit='10000'):
        # String literal, pull all available data from API for some time frame
        url = f'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=year<={endyear} AND year >= {startyear}&$order=date ASC&$limit={limit}'
        # Using our app token
        headers = {'Accept': 'application/json', 'X-App-Token': APP_TOKEN}
        resp = requests.get(url,headers=headers)
        df = json.loads(resp.text)

        # Load data into a pandas dataframe
        data = pd.DataFrame(df)

        # Some typecasting
        data['date'] = pd.to_datetime(data['date'], errors='coerce')
        data['updated_on'] = pd.to_datetime(data['updated_on'], errors='coerce')
        data['year'] = pd.to_datetime(data['year'], errors='coerce')
        data['community_area'] = pd.to_numeric(data['community_area'], downcast='integer',errors='coerce')
        # Location is dropped since each row is a dictionary, mysql db doesn't like this
        data.drop(columns=['location'], inplace=True)

        return data

    # cleaning bulk dataset (initial load for full dataset)
    def get_bulk_crime_data(self, file):
        bulk = pd.read_csv(file, dtype={'ID':'str','Arrest':'str','Domestic':'str'})
        # Some typecasting
        bulk['Date'] = pd.to_datetime(bulk['Date'], errors='coerce')
        bulk['Updated On'] = pd.to_datetime(bulk['Updated On'], errors='coerce')
        bulk['Community Area'] = pd.to_numeric(bulk['Community Area'], downcast='integer',errors='coerce')
        # Location is dropped since each row is a dictionary, mysql db doesn't like this
        bulk.drop(columns=['Location'], inplace=True)

        return bulk
    
    # Send some data to a table in our database (creates a completely new table)
    def send_data(self, data, tablename):
        data.to_sql(name=tablename, con=self.mydb, if_exists='replace', index=False)