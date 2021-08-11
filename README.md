# Fetch Points

This application is built to the specifications of the Fetch Rewards Coding Exercise challenge. This has only been tested on Ubuntu 20.04 and is written using NodeJS utilizing Express as well as Python for Unit Testing.

## API Calls

There are 3 required API calls:

- `/api/add-transaction` - Adds a transaction for a specific payer and date.
- `/api/spend-points` - Spends points based on the provided rules.
- `/api/get-balances` - Return the remaining point balances of individuals.

I created an additional API call for testing:

- `/api/clear` - Clears out the database.

# How to Run

The application is encased in docker containers to help the ease of testing on different machines.

The system requires `docker` and `docker-compose`

## Installing Docker

See Docker's installation page for detailed instructions on how to install docker.

https://docs.docker.com/get-docker/

## Installing docker-compose

See Docker's installation guide to install docker-compose for your system.

https://docs.docker.com/compose/install/

## Running the Application

1. Clone the repo to your machine
2. From the project's root directory run docker compose to build and run the containers

   `sudo docker-compose up --build`

3. You can make API calls to test at `http://localhost:3001/` however I have provided a unit testing suite and this can be ran from within the container.

## Running the Unit Tests

1. Execute the previous steps to get the containers running
2. Confirm the containers are runninh

   `sudo docker ps`

3. Run `sudo docker exec -it backend sh` to gain a shell into the application container
4. Change to the test directory

   `cd test/`

5. Run all the Unit Tests via Python

   `python3 unittests.py`

   OR

   Run a single unit test with:

   `python3 unittests.py FetchPointsTests.test_case##`
