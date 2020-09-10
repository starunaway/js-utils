const getType = require('./getType');

function shallowClone(obj) {
  const Ctor = obj.constructor;

  if (/^object$/i.test(getType(obj))) {
    return {...obj};
  } else if (/^array$/i.test(getType(obj))) {
    return [...obj];
  } else if (/^date|error|regexp|map|set|weakmap|waeakset$/i.test(getType(obj))) {
    return new Ctor(obj);
  } else if (/^symbol|bigint$/i.test(getType(obj))) {
    return Object(obj);
  } else if (/^function$/i.test(getType(obj))) {
    return function () {
      return obj.call(this, ...arguments);
    };
  } else {
    return obj;
  }
}

function deepClone(obj, cache = new Set()) {
  if (!/^object|array$/i.test(getType(obj))) {
    return shallowClone(obj);
  }

  // 避免无限套娃  -> 对象的所层级下引用了同一个对象
  if (cache.has(obj)) {
    return obj;
  }
  cache.add(obj);
  let Ctor = obj.constructor;

  let keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
  let result = new Ctor();

  keys.forEach((key) => {
    result[key] = deepClone(obj[key], cache);
  });

  return result;
}

exports.shallowClone = shallowClone;
exports.deepClone = deepClone;
