const mongoose = require('mongoose');

/**
 * take a schema of data then generates and returns mongoose schema
 *
 * @param {Object} schema
 *
 * @returns {Object}
 * @throws {TypeError}
 */
const generateMongooseSchema = (schema, schemaName) => {

  const cache = {};
  Object.entries(schema).forEach(([key, type]) => {
    switch (type) {
      case 'string':
        cache[key] = String;
        break;
      case 'number':
        cache[key] = Number;
        break;
      case 'boolean':
        cache[key] = Boolean;
        break;
      case 'date':
        cache[key] = Date;
        break;
      default:
        throw new TypeError(`Invalid datatype ${type} of ${key}`);
    }
  }); // end of foreach

  const mongooseSchema = mongoose.Schema(cache);

  const dataModel = mongoose.model(schemaName, mongooseSchema);

  return dataModel;
};

module.exports = generateMongooseSchema;
