// const Joi = require('@hapi/joi');

// const valueSchema = Joi.alternatives().try(
//   Joi.number(),
//   Joi.string(),
//   Joi.boolean(),
//   Joi.date(),
// );

/**
 * gets a schema, and validate its values
 * @param {Object} schema
 *
 * @returns {boolean}
 *
 * @example schemaValidatore({"userName": "string"})
 * // true
 *
 * @example schemaValidatore({"userName": []})
 * // false
 */
const schemaValidatore = schema => !!schema;

module.exports = schemaValidatore;
