/* jshint node:true */
'use strict';

var tools = require('../tools');

function dynamicDelegate (baseObject, metaObject, propertyName) {
  var methodNames = tools.getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  baseObject[propertyName] = {};

  while (index--) {
    methodName = methodNames[index];
    //baseObject[propertyName][methodName] = dynamicApply(baseObject, propertyName, methodName, baseObject);
    baseObject[propertyName][methodName] = tools.apply(metaObject, methodName, baseObject);
  }

  return baseObject;
}


exports.do = dynamicDelegate;
