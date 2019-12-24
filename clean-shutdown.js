const mongodbConnection = require('./mongodb-connection');

/**
 * close db connection and shutdown the app
 *
 * @param {Function} gracefulShutdown - used to close db connection
 *
 * @returns {void}
 */
const closeApp = (signal, gracefulShutdown) => {
  // For nodemon restarts
  switch (signal) {
    case 'SIGUSR2':
      gracefulShutdown()
        .then(() => {
          console.log(`@process.on('SIGUSR2')`);
          process.kill(process.pid, 'SIGUSR2');
        })
        .catch(err => {
          console.error(`@process.on('SIGUSR2') [error: %s]`, err.message);
          process.kill(process.pid, 'SIGUSR2');
        });
      break;

    case 'SIGINT': // For app termination
    case 'SIGTERM': // For Heroku app termination
      gracefulShutdown()
        .then(() => {
          console.log(`@process.on('SIGINT') termination (SIGINT)`);
          process.exit(0);
        })
        .catch(err => {
          console.error(`@process.on('SIGINT') [error: %s]`, err.message);
          process.exit(0);
        });
      break;
    default:
      break;
  }
};

/**
 * drop the database
 *
 * @returns {Promise<void>}
 */
const dropDatabase = async dbModel => {
  dbModel.remove();
  return Promise.resolve(dbModel);
};

/**
 * [TODO] return error code when droping database fail
 * @param {string} schemaName
 */
const cleanShutdown = async (signal, dbModel) => {
  if (!dbModel) console.error('@cleanShutdown dbModel is required');
  else {
    // clean the data base before shutdown
    await dropDatabase(dbModel).catch(err => console.error(err));
  }

  closeApp(signal, mongodbConnection.gracefulShutdown);
};

module.exports = cleanShutdown;
