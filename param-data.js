// 原生js实现对象序列化为字符串, 用于URL查询字符串或AJAX请求
!function (global) {
  // 导出方法
  function _export (name, handle) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = handle;
    } else if (typeof define === 'function' && define.amd) {
      define([], function () {
        return handle;
      });
    } else {
      global[name] = handle;
    }
  }
  function getType (data) {
    return Object.prototype.toString.call(data).split(' ')[1].slice(0, -1)
  }
  
  function main (data) {
    var res = [];
    
    // 当value不为数组或者JSON时，就可创建一条数据
    function addOne (key, value) {
      value = typeof value === 'function' ? value() : value;
      value = value === undefined || value === null || typeof value === 'undefined' ? '' : value
      res[res.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }
    
    buildParam('', data)
    function buildParam (prefix, item) {
      var index, objKey;
      if(prefix) {
        switch (getType(item)) {
          case 'Array':
            for(index=0; index<item.length; index++) {
              // 如果数组项为object，需要创建一个索引
              buildParam(prefix + '['+ (typeof item[index]==='object' && item[index] ? index : '') +']', item[index])
            }
            break;
          case 'Object':
            for(objKey in item) {
              // 组装JSON的key为prefix
              buildParam(prefix + '[' + objKey + ']', item[objKey])
            }
            break;
          default:
            addOne(prefix, item)
        }
      } else {
        switch (getType(item)) {
          case 'String':
          case 'Object':
            for(objKey in item) {
              buildParam(objKey, item[objKey])
            }
            break;
          case 'Array':
            for(index=0; index<item.length; index++) {
              addOne(item[index].name, item[index].value)
            }
            break;
        }
      }
    }
    
    return res.join('&')
  };
  
  _export('ParamData', main)
} (this);