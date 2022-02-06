# chicago-crime-dashboard
A dashboard to visualize Chicago crime statistics by community area. Data was gathered from the city of Chicago's public datasets: [2001 to present - Dashboard](https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present-Dashboard/5cd6-ry5g), [Boundaries - Community Areas](https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Community-Areas-current-/cauq-8yn6).

Python is used to load data into a [AWS RDS](https://aws.amazon.com/rds/) instance, [Cubejs](https://cube.dev) is used to build an api to interact with said database, and a react app serves as the front-end. Finally, a python script is set up to run daily on [Heroku](https://id.heroku.com/login) to pull updated data from Chicago's public dataset.

For more specifics, see the README within each subdirectory.

View the live dashboard [here](https://cube-cc-dashboard.netlify.app).
