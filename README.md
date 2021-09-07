# Rob Caiger - Shopping List Challenge

## Version
5b8d0fd276b6d288905ed2f63a934e057e8feca2

## Getting started

### Install the packages
To install the package dependencies for both the API and the client.
```
make install
```
This will run `npm install` in the `client` and `api` directories.

### Running the tests
To run the unit tests 
```
make test-unit
```

To run the integration tests. For simplicity during the challenge, you need to have the local environment running to
execute the integration tests. The tests will also truncate the data from the database.
```
make test-int
```

### Start the environment
To start the local development environment.
- The front-end application will be running on [http://localhost:3000](http://localhost:3000)
- The api will be running on [http://localhost:3001](http://localhost:3001)
- The database will be exposed on port 3306 (The only reason this is exposed is for simplicity during the integration tests)

NOTE: It may take 20-30 seconds or so to setup the mysql container due to the healthcheck
NOTE: This will run docker-compose in an attached state so a ctrl+c will stop the environment 
```
make start
```

There's also the option to run it in detached mode
```
make start-detached
```
and you can stop the environment with
```
make stop
```

### Storybook
The client application comes with a storybook. Run the following command to run the storybook.
```
make storybook
```


