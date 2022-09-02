const loaderUtils = require('loader-utils');
// 只能用function函数，不能使用箭头函数
module.exports = function(source) {
  const reg = /(console.log()(.*)())/g;
  return source.replace(reg, '');
}