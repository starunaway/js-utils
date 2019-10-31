export const isFunction = (f) => typeof f === 'function';
export const isString = (s) => typeof s === 'string';
export const isArray = Array.isArray.bind(Array);

export const isHTMLElement = (node) => {
  return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
};

export const onError = (app, onErr) => {
  return (err) => {
    if (err) {
      if (isString(err)) {
        err = new Error(err);
      }
      if (onErr && isFunction(onErr)) {
        onErr(err, app._store.dispatch);
        throw new Error(err.stack || err);
      }
    }
  };
};
