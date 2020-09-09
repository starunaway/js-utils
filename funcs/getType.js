const types = [
  'Number',
  'String',
  'Boolean',
  'Symbol',
  'BigInt',
  'Null',
  'Undefined',
  'Object',
  'Array',
  'Date',
  'Function',
  'Error',
  'RegExp',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
];

function getType(obj) {
  const protoType = types.map((type) => `[object ${type}]`);
  const typeMap = {};
  types.forEach((type, index) => {
    typeMap[protoType[index]] = type.toLowerCase();
  });

  const objType = Object.prototype.toString.call(obj);
  return typeMap[objType];
}

module.exports = getType;

// const number1 = 121;
// const string1 = '123214';
// const boolean1 = true;
// const symbol1 = Symbol('2312');
// const bigInt1 = 23n;
// const null1 = null;
// const undefined1 = undefined;
// const object1 = {};
// const array1 = [1, 2, 3, 4];
// const date1 = new Date();
// const function1 = function () {};
// const error1 = new Error();
// const regex1 = /111/;

// console.log('number1', getType(number1));
// console.log('string1', getType(string1));
// console.log('boolean1', getType(boolean1));
// console.log('symbol1', getType(symbol1));
// console.log('bigInt1', getType(bigInt1));
// console.log('null1', getType(null1));
// console.log('number1', getType(number1));
// console.log('undefined1', getType(undefined1));

// console.log('object1', getType(object1));
// console.log('array1', getType(array1));

// console.log('date1', getType(date1));
// console.log('function1', getType(function1));
// console.log('error1', getType(error1));
// console.log('regex1', getType(regex1));
