# react-dashboard
Cubejs works as a back-end api to interface with my database. It allows for the caching of certain quereies so that retrieval times are much more efficent. The refresh worker is run every 3 hours. After updates are pulled into the AWS RDS instance, the refresh worker needs to be run before updates will be visible on the live site. Cached data is stored on a different database within the RDS instance.

The api is hosted on the [Cube Cloud](https://cubecloud.dev/auth/signup), a service the Cube team provides as an easy way to host a Cubejs API.