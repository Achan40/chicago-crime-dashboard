# dbscripts
This script is used to bulk load the AWS RDS instance with data from the database. The bulk load is only used to load the initial dataset, then update method is used to load updated only data into the database. 

Heroku's advanced scheduling add-on manages the running of the updates script.