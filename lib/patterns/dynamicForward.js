/* jshint node:true */
'use strict';

var tools = require('../tools');

function dynamicForward (baseObject, metaObject, propertyName) {
  var methodNames = tools.getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  baseObject[propertyName] = {};

  while (index--) {
    methodName = methodNames[index];
    //baseObject[propertyName][methodName] = dynamicApply(baseObject, propertyName, methodName, metaObject);
    baseObject[propertyName][methodName] = tools.apply(metaObject, methodName, metaObject);
  }

  return baseObject;
}


exports.do = dynamicForward;
