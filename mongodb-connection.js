const mongoose = require('mongoose');

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = () => mongoose.connection.close();

const connect = async dbUri => {
  mongoose.Promise = Promise;
  mongoose.set('useCreateIndex', true);
  await mongoose
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

  return Promise.resolve();
};

module.exports = { connect, gracefulShutdown };
