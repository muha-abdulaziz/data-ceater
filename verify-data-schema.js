/**
 * gets a schema, and validate its values
 * @param {Object} schema
 *
 * @returns {boolean}
 * @throws {TypeError}
 *
 * @example schemaValidatore({"userName": "string"})
 * // true
 *
 * @example schemaValidatore({"userName": []})
 * // false
 */
const schemaValidatore = schema => {
  const schemaEntries = Object.entries(schema);
  const keyIndex = 0;
  const typeIndex = 1;

  const len = schemaEntries.length;
  for (let i = 0; i < len; i++) {
    const type = schemaEntries[i][typeIndex];
    const key = schemaEntries[i][keyIndex];

    if (!key) {
      console.error(`property name '${key}' can not be empty`);
      return false;
    }

    if (key.length > 50) {
      console.error(
        `property name '${key}' can not be more than 50 characters`,
      );
      return false;
    }

    if (typeof type !== 'string') {
      console.error('datatype must be -> string, number, boolean or date');
      return false;
    }

    switch (type) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'date':
        break;
      default:
        console.error(`Invalid datatype ${type} of ${key}`);
        console.error('Allowed datatype -> string, number, boolean or date');
        return false;
    }
  } // End of for

  return true;
};

module.exports = schemaValidatore;
