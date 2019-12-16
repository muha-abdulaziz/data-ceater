# About the app

This is a small console app, that takes a schema of data and generate a data depending on the schema, then let a user manipulate the data.

## App dependancies

  - readline: to get inputs from a user
  - joi: to validate the user inputs
  - faker: to create random data
  - mongoose: to deal with mongodb
  - commander: to get argvs from the command line (I plan to get the db info from the user or from ENV) 

## using the app

As usual you need to install the dependencies of the app, go to the diractory of the app, and run the following command.

```bash
npm install
```

Then to run the app

```bash
node app.js
```

to exit/quit -for now- press `CTRL+D` or `CTRL+C`

### Schema

The schema has to be: 
  - a valid JSON.
  - flat (no nested JSON/object)
  - data types (string, number, boolean and date)

### Queries

Still not implemented

## Limitation

For now the app still do nothing. it just checks if the schema is a valid JSON

