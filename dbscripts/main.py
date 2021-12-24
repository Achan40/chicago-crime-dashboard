from os import pardir, read
import pandas as pd
from CrimeData import CrimeData

if __name__ == '__main__':
    cdobj = CrimeData()

    # create corecrimedata table, commareas table
    # cdobj.create_corecrimedata()
    # cdobj.create_commareas()

    # populate commareas table
    # commareas = pd.read_csv('./datasets/CommAreas.csv')
    # cdobj.insert_commareas(commareas)

    # loading bulk data into corecrimedatatable
    # df = cdobj.get_bulk_crime_data('2010','2011','200')
    # cdobj.insert_corecrimedata(df)

    # retrieving and sending updates
    # should only use when after all bulk data is loaded in, for obvious reasons.
    latest = cdobj.most_recent_update_on_corecrimedata() # max value in corecrimedata updated_on column
    updates = cdobj.get_corecrimedata_updates(timestamp=latest,limit='500')
    cdobj.insert_corecrimedata(updates)

    # should always close database connection when finished
    cdobj.close()