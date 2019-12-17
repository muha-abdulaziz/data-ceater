const mongoose = require('mongoose');

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = () => mongoose.connection.close();

// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown()
    .then(() => {
      console.log(`@process.on('SIGUSR2')`);
      process.kill(process.pid, 'SIGUSR2');
    })
    .catch(err => {
      console.error(`@process.on('SIGUSR2') [error: %s]`, err.message);
      process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
  gracefulShutdown()
    .then(() => {
      console.log(`@process.on('SIGINT') termination (SIGINT)`);
      process.exit(0);
    })
    .catch(err => {
      console.error(`@process.on('SIGINT') [error: %s]`, err.message);
      process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown()
    .then(() => {
      console.log(`@process.on('SIGTERM') App termination (SIGTERM)`);
      process.exit(0);
    })
    .catch(err => {
      console.error(`@process.on('SIGTERM') [error: %s]`, err.message);
      process.exit(0);
    });
});

const dbConnection = async dbUri => {
  mongoose.Promise = Promise;
  mongoose.set('useCreateIndex', true);
  mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      reconnectTries: Number.MAX_VALUE,
    })
    .then(() => {
      console.log('@mongoose.connect() Successfully connected to mongoDB');
    })
    .catch(err => {
      console.error(
        `@mongoose.connect() failed connect to mongoDB [error: %s]`,
        err.message,
      );
      gracefulShutdown()
        .then(() => {
          process.exit(1);
        })
        .catch(() => {
          process.exit(1);
        });
    });
};

module.export = { dbConnection, gracefulShutdown };
