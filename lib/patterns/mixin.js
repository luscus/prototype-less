var extend = require('node.extend');

function mixin (baseObject, metaObject) {
  extend(true, baseObject, metaObject);

  return baseObject;
}


exports.do = mixin;
