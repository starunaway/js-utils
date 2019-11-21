function formatNum(value) {
  value = value.replace(/[^\d.]/g, '');
  value = value.replace(/\.{2,}/g, '.');
  value = value
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.');
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  if (value.indexOf('.') < 0 && value !== '') {
    // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01
    value = parseFloat(value).toString();
  }
  let strs = value.split('.');
  //     小数点前面是几位
  let str1 = !!strs[0] ? strs[0].match(/\d{0,9}/) : '';
  str1 += value.indexOf('.') !== -1 ? '.' : '';
  let str2 = !!str1 ? (!!strs[1] ? strs[1] : '') : '';
  let str = str1 + str2;
  if (str === '.') {
    str = '0.';
  } else if (str.indexOf('.') === 0) {
    str = '0' + str;
  }
  return str;
}
