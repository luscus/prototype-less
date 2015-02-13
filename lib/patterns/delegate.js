/* jshint node:true */
'use strict';

var tools = require('../tools');

function delegate (baseObject, metaObject) {
  var methodNames = tools.getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  while (index--) {
    methodName = methodNames[index];
    baseObject[methodName] = tools.apply(metaObject, methodName, baseObject);
  }

  return baseObject;
}


exports.do = delegate;
