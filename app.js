const readline = require('readline');

const commandExecuter = require('./commandExecuter');
const verifySchema = require('./verify-schema');
const cleanShutdown = require('./clean-shutdown');

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
  cleanShutdown('SIGINT');
  // rl.question('Are you sure you want to exit? ', answer => {
  //   if (answer.match(/^y(es)?$/i)) cleanShutdown('SIGINT');
  // });
});

// For nodemon restarts
process.once('SIGUSR2', () => cleanShutdown('SIGUSR2'));

// For Heroku app termination
process.on('SIGTERM', () => cleanShutdown('SIGTERM'));

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
    throw new Error('Invalid JSON');
  }
};

rl.question('Enter your schema: ', userInput => {
  try {
    const schema = toJson(userInput);

    // check the validaty of schema
    if (!verifySchema(schema)) {
      throw new Error('invalid schema');
    }

    commandExecuter.runCommand('schema', schema);
    rl.prompt();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
});

rl.on('line', input => {
  console.log(`Received: ${input}`);
  rl.prompt();
});
