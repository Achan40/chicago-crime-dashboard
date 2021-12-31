import numpy as np
import pandas as pd
from CrimeData import CrimeData

if __name__ == '__main__':
    cdobj = CrimeData()

    # create corecrimedata table, commareas table
    # cdobj.create_corecrimedata()
    # cdobj.create_commareas()

    # populate commareas table
    # commareas = pd.read_csv("./datasets/CommAreas.csv")
    # cdobj.insert_commareas(commareas)

    # loading bulk data into corecrimedatatable
    for year in range(2020,2022):
        df = cdobj.get_bulk_crime_data(year,'500000') # fetch data from API
        # upload data in chunks
        for chunk in np.array_split(df,20):
            cdobj.insert_corecrimedata(chunk)
        print(str(year) + " completed upload.")

    # retrieving and sending updates
    # should only use when after all bulk data is loaded in, for obvious reasons.
    # latest = cdobj.most_recent_update_on_corecrimedata() # max value in corecrimedata updated_on column
    # updates = cdobj.get_corecrimedata_updates(timestamp=latest,limit='50000')
    # cdobj.insert_corecrimedata(updates)

    # should always close database connection when finished
    cdobj.close()