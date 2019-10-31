import {effects} from 'redux-saga';
import * as Fetch from '../utils/fetch';

export function sagaBuilder(options, args) {
  const sagaArr = [];
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      let value = options[key];
      if (value instanceof Array) {
        for (let item of value) {
          if (item.url) {
            sagaArr.push(createSaga(item, args));
          }
        }
      } else {
        sagaArr.push(value);
      }
    }
  }

  return function*() {
    for (let saga of sagaArr) {
      yield effects.fork(saga);
    }
  };
}

function bodyHandler(data, type, method) {
  if (method !== 'get' && data) {
    if (type === 'json') {
      return JSON.stringify(data);
    } else if (type === 'from') {
      let pairs = [];
      for (let key of data) {
        pairs.push(key + '=' + data[key]);
      }
      return pairs.join('&');
    }
  }
  if (method === 'get') {
    return '';
  }
  return data;
}

function getEffect(item) {
  return function* baseEffect({payload}, {fetch, option}) {
    return yield fetch(item.url(payload), option);
  };
}
