const { 
  noArgs, 
  argNotAnObject,
  invalidOrEmptyObject 
} = require('./messages');

const deepClone = object => {

  if(!object) {
    return noArgs;
  }
  if (typeof object !== 'object') {
    return argNotAnObject;
  }
  
  if(!Object.keys(object).length) {
    return invalidOrEmptyObject;
  }
  
  const newObject = {};
  const types = ['function', 'string', 'boolean', 'number'];

  for (let currentKey in object) {
      const value = object[currentKey];
      const isAnInstance = value instanceof Date || value instanceof Map || value instanceof Set || value instanceof String;

    if (types.includes(typeof value) || isAnInstance) {
      newObject[currentKey] = value;
    } else {
      newObject[currentKey] = deepClone(value)
    }
  }
return newObject;
}

module.exports = { deepClone };
