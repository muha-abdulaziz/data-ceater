const readline = require('readline');

const commandExecuter = require('./commandExecuter');
const verifyDataSchema = require('./verify-data-schema');
const cleanShutdown = require('./clean-shutdown');
const mongodbConnection = require('./mongodb-connection');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
 **************************************************************
 ******************* handel process signals *******************
 **************************************************************
 */

// for more see unix jobs
rl.on('SIGCONT', () => {
  // resume the stream
  rl.prompt();
});

rl.on('SIGINT', () => {
  const { dbModel } = commandExecuter;
  cleanShutdown('SIGINT', dbModel);
  // rl.question('Are you sure you want to exit? ', answer => {
  //   if (answer.match(/^y(es)?$/i)) cleanShutdown('SIGINT');
  // });
});

// For nodemon restarts
process.once('SIGUSR2', () => cleanShutdown('SIGUSR2'));

// For Heroku app termination
process.on('SIGTERM', () => {
  const { dbModel } = commandExecuter;
  cleanShutdown('SIGTERM', dbModel);
});

/*
 ***************************************************************
 ************************ Logic begains ************************
 ***************************************************************
 */

/**
 * convert string of JSON to JS Object
 * @param {string} json
 *
 * @returns {Object}
 */
const toJson = json => {
  try {
    const schema = JSON.parse(json);
    return schema;
  } catch (err) {
    console.error('Invalid JSON');
    process.exit(1);
  }
};

rl.question('Enter your schema: ', async userInput => {
  try {
    const schema = toJson(userInput);

    // check the validaty of schema
    if (!verifyDataSchema(schema)) {
      console.error('Invalid schema');
      process.exit(1);
    }

    await mongodbConnection.connect('mongodb://127.0.0.1:27017/test');

    await commandExecuter.runCommand('schema', schema);
    rl.prompt();
  } catch (err) {
    console.error(err);

    const { dbModel } = commandExecuter;
    cleanShutdown('SIGINT', dbModel);
  }
});

rl.on('line', input => {
  console.log(`Received: ${input}`);
  rl.prompt();
});
