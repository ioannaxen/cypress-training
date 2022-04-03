# Cypress tutorial

This project is based on the Frontend Masters course [Testing Web Apps with Cypress](https://frontendmasters.com/courses/cypress) by [Steve Kinney](https://github.com/stevekinney).

The example repo for this tutorial can be found [here](https://github.com/stevekinney/cypress).


## Getting Started

Ensure you're using node 16.

First and foremost, install your dependencies.

```
npm install
```

Next, set up the database.

```
npm run db:setup
```

Finally, spin up the server.

```
npm start
```

Your server will need to be running when you go to run your tests.

## Running the Tests

You can run the tests using the following command. **Note**: You must have completed the following steps and have the server up and running.

```
npx cypress open
```