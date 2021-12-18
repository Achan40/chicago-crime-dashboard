from os import pardir
import pandas as pd
from CrimeData import CrimeData

if __name__ == '__main__':
    cdobj = CrimeData()
    tmp = cdobj.get_crime_data(startyear='2010',endyear='2011',limit='1000')
    cdobj.send_data(tmp, 'corecrimedata')

    # load community area identifier dataset into database
    # commareas = pd.read_csv('CommAreas.csv', usecols=['AREA_NUMBE','COMMUNITY'])
    # cdobj.send_data(commareas, 'commareas')

    