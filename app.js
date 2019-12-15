const readline = require('readline');

const commandExecuter = require('./commandExecuter');
const verifySchema = require('./verify-schema');

const toJson = json => {
  try {
    const schema = JSON.parse(json);
    return schema;
  } catch (err) {
    throw new Error('Invalid JSON');
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// for more see unix jobs
rl.on('SIGCONT', () => {
  // resume the stream
  rl.prompt();
});

// [TODO] handel SIGINT
// rl.on('SIGINT', () => {
//   rl.question('Are you sure you want to exit? ', (answer) => {
//     if (answer.match(/^y(es)?$/i)) rl.pause();
//   });
// });

rl.question('Enter your schema: ', userInput => {
  try {
    const schema = toJson(userInput);

    // check the validaty of schema
    if (!verifySchema(schema)) {
      throw new Error('invalid schema');
    }

    commandExecuter.runCommand('query', schema);
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
