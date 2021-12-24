from os import pardir
import pandas as pd
from CrimeData import CrimeData

if __name__ == '__main__':
    cdobj = CrimeData()
    df = cdobj.get_bulk_crime_data('2010','2011','1000000')
    cdobj.insert_corecrimedata(df)
    cdobj.close()

    