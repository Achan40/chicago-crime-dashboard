import numpy as np
import pandas as pd
from CrimeData import CrimeData

if __name__ == '__main__':
    cdobj = CrimeData()

    # create database
    # cdobj.create_database('crimeinfo')

    # create corecrimedata table, commareas table
    # cdobj.create_corecrimedata()
    # cdobj.create_commareas()

    # populate commareas table
    # commareas = pd.read_csv("./datasets/CommAreas.csv")
    # cdobj.insert_commareas(commareas)

    # loading bulk data into corecrime data table
    # for year in range(2001,2024):

    #     # find the max number of records we need to pull for a certain year
    #     num_records = cdobj.get_year_count(year, 'case_number')

    #     # generate sequence for offset
    #     sequence = list(range(0, num_records, 100000))

    #     # page through data and upload
    #     for ind in sequence:
    #         df = cdobj.get_bulk_crime_data(year,limit='100000', offset=str(ind)) # fetch data from API
    #         # upload data to table in chunks
    #         for chunk in np.array_split(df,10):
    #             cdobj.insert_corecrimedata(chunk)
    #     print(str(year) + " completed upload.")

    # create year-month-day column
    cdobj.create_y_m_d()
    cdobj.update_y_m_d()

    # create year-month column
    cdobj.create_m()
    cdobj.update_m()

    # retrieving and sending updates
    # should only use when after all bulk data is loaded in, for obvious reasons.
    #latest = cdobj.most_recent_update_on_corecrimedata() # max value in corecrimedata updated_on column
    #earliest_yr = cdobj.earliest_year() # earliest year available in my database, don't want to accidently grab data for years that I haven't stored
    #updates = cdobj.get_corecrimedata_updates(timestamp=latest,earliest_year=earliest_yr,limit='100000')
    #cdobj.insert_corecrimedata(updates)

    # should always close database connection when finished
    cdobj.close()