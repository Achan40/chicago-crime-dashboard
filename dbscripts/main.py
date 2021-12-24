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
    df = cdobj.get_bulk_crime_data('2010','2011','1000000')
    cdobj.insert_corecrimedata(df)

    # retrieving and sending updates
    # latest = cdobj.most_recent_update_on_corecrimedata()
    # updates = cdobj.get_corecrimedata_updates(timestamp=latest,limit='50000')
    # cdobj.insert_corecrimedata(updates)

    cdobj.close()

    