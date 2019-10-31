// 接收参数；
// data: [{}]
// sortKeys，[{}]，排序key值，对应的key应该是data元素的某个key值，使用sort字段指定排序排序方向，默认为’asc‘
// sortKeys为数组，支持多级排序，有多少级排多少级

export default function sortData(data, sortKeys) {
  let newData = [...data];
  newData.sort((first, second) => sortUtil(first, second, sortKeys, 0));
}

function sortUtil(f, s, keys, index) {
  if (!isTrue(f[keys[index].key]) && isTrue(s[keys[index].key])) {
    return keys[index].sort === 'desc' ? 1 : -1;
  } else if (isTrue(f[keys[index].key]) && !isTrue(s[keys[index].key])) {
    return keys[index].sort === 'desc' ? -1 : 1;
  } else if (!isTrue(f[keys[index].key]) && !isTrue(s[keys[index].key])) {
    index++;
    if (index <= keys.length - 1) {
      return sortUtil(f, s, keys, index);
    } else {
      return keys[--index].sort === 'desc' ? -1 : 1;
    }
  } else {
    if (f[keys[index].key] > s[keys[index].key]) {
      return keys[index].sort === 'desc' ? -1 : 1;
    } else if (f[keys[index].key] < s[keys[index].key]) {
      return keys[index].sort === 'desc' ? 1 : -1;
    } else {
      index++;
      if (index <= keys.length - 1) {
        return sortUtil(f, s, keys, index);
      } else {
        return keys[--index].sort === 'desc' ? -1 : 1;
      }
    }
  }
}

// TODO: 0 和 空字符串 不参与排序和默认的排序方式 要根据需求改变
function isTrue(data) {
  if (data === null || data === undefined || data === false) {
    return false;
  }
  return true;
}

// sortData(data, [{key: 'key0', sort: 'asc'}, {key: 'key1', sort: 'desc'}]);
