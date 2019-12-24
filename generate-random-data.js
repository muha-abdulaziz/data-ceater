const faker = require('faker');

const generateStringValue = key => {
  switch (key.toUpperCase()) {
    case 'NAME':
      return faker.name.findName();
    case 'LASTNAME':
      return faker.name.lastName();
    case 'FIRESTNAME':
      return faker.name.firstName();
    case 'EMAIL':
      return faker.internet.email();
    case 'ADDRESS':
      return `${faker.address.streetAddress()}, ${faker.address.city()}`;
    case 'CITY':
      return faker.address.city();
    case 'COLOR':
      return faker.commerce.color();
    case 'COMPANY':
      return faker.commerce.company();
    case 'PHONENUMBER':
      return faker.phone.phoneNumber();
    default:
      return faker.random.words();
  }
};

const generateRandomNumber = () => faker.random.number();

/**
 * generats a random data debending on a schema,
 * and save into database
 *
 * @param {Object} schema
 * @param {Object} dataModel database connection
 *
 * @returns {boolean}
 */
const generateRandomData = async (schema, dataModel) => {
  // iteration number between 1 - 10
  const iterNum = generateRandomNumber() % 10;

  console.log('iterNum:', iterNum);

  const promiseArr = [];
  for (let i = 0; i <= iterNum; i++) {
    const document = {};
    Object.entries(schema).forEach(([key, type]) => {
      switch (type) {
        case 'string':
          document[key] = generateStringValue(key);
          break;
        case 'number':
          document[key] = generateRandomNumber(key);
          break;
        case 'boolean':
          document[key] = faker.random.boolean();
          break;
        case 'date':
          document[key] = faker.date.past();
          break;
        default:
          break;
      }
    }); // End of forEach
    promiseArr.push(dataModel.create(document));
  } // End of for

  // wait untill all data created
  await Promise.all(promiseArr);

  return true;
};

module.exports = generateRandomData;
