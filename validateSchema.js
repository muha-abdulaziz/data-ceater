const Joi = require('@hapi/joi');

/**
 * @param {*} data - data that need to validate
 * @param {object} schema - joi schema
 *
 * @returns {*} - data after validate
 */
module.exports = async (data, schema) => {
  if (!schema) throw new Error('Missing argument `schema`');

  // check if the schema is a Joi schema
  if (!Joi.isSchema(schema)) throw new Error('invalidSchema');

  try {
    const value = await schema.validateAsync(data);

    // return validated data
    return value;
  } catch (err) {
    return Promise.reject(err);
  }
};
