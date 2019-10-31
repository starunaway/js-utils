function isFunction(func) {
  return typeof func === 'function';
}

// receive.call(this,'key',nexProps).success(callback)
// 每次会创建一个Manager实例，然后调用Manager.success(callback)
function receive(key, nexProps) {
  const _this = this;
  return new Manager(key, _this, nexProps);
}

class Manager {
  constructor(key, _this, nexProps) {
    // diff可能有一个或多个，统一按数组进行计算
    this.diffs = [];
    if (key instanceof Array) {
      for (const k of key) {
        if (typeofk === 'string') {
          // diffs 存放的是Diff对象，通过callback进行操作
          this.diffs.push(new Diff(k, _this, nexProps));
        } else {
          throw Error(`Array item should be string , but [${typeof key}]`);
        }
      }
    } else if (typeof key === 'string') {
      this.diffs.push(new Diff(key, _this, nexProps));
    } else {
      throw Error(`props key should be Array or string , but [${typeof key}]`);
    }
  }

  // 对所有的key设置回调，如果是数组，则可以在callback总进行判断处理

  loading = (callback) => {
    // 对本Manager中的diff做loading状态的回调
    this.diffs.forEach((d) => d.loading(callback));
    return this;
  };

  success = (callback) => {
    // 对本Manager中的diff做success状态的回调
    this.diffs.forEach((d) => d.success(callback));
    return this;
  };

  error = (callback) => {
    // 对本Manager中的diff做error状态的回调
    this.diffs.forEach((d) => d.error(callback));
    return this;
  };
}

class Diff {
  // 目标是判断props修改后应该执行什么操作
  constructor(key, _this, nexProps) {
    this.result = {
      key,
      loading: [],
      success: [],
      error: []
    };

    const prop = _this.props[key];
    const nProp = nexProps[key];
    if (prop !== nProp) {
      // 如果this.props[key]!==nexProps[key]
      // this.props -> 上一次渲染的  nexProps -> 将要渲染的
      // 每次创建diff实例的时候都会初始化Diff对象的result(创建一个新的result)
      // 每次 callback都会根据 result的 key-value 进行判断 -> 是否执行
      const {result, payload} = nProp || {};
      if (nProp.loading) {
        this.result.loading.push(payload);
      } else {
        if (nProp.success && nProp.status === 200) {
          this.result.success.push(result, payload, nProp.message);
        } else {
          this.result.error.push(nProp.message || nProp.error);
        }
      }
    }
  }

  loading = (callback) => {
    if (isFunction(callback) && this.result.loading.length > 0) {
      callback(...this.result.loading);
    }
    return this;
  };

  success = (callback) => {
    if (isFunction(callback) && this.result.success.length > 0) {
      callback(...this.result.success);
    }
    return this;
  };
  error = (callback) => {
    if (isFunction(callback) && this.result.error.length > 0) {
      callback(...this.result.error);
    }
    return this;
  };
}
