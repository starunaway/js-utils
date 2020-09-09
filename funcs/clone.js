const getType = require('./getType');

function shallowClone(obj) {
  const Ctor = obj.constructor;

  if (/^object$/i.test(getType(obj))) {
    return {...obj};
  } else if (/^array$/i.test(getType(obj))) {
    return [...obj];
  } else if (/^date|error|regexp|map|set|weakmap|waeakset$/i.test(getType(obj))) {
    return new Ctor(obj);
  } else {
    return obj;
  }
}

function deepClone(obj) {
  return shallowClone(obj);
}

exports.shallowClone = shallowClone;
exports.deepClone = deepClone;
