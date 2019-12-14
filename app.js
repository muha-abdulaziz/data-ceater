const readline = require('readline');

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

rl.question('What do you think of Node.js? ', answer => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.prompt();
  // rl.close();
});

rl.on('line', input => {
  console.log(`Received: ${input}`);
  rl.prompt();
});
