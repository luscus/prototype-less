/* jshint node:true */
'use strict';

exports.apply = function apply (metaObject, methodName, context) {
  return function () {
    return metaObject[methodName].apply(context, arguments);
  };
};

exports.getMethodList = function dynamicApply (baseObject, propertyName, methodName, context) {
  return function () {
    var toProvider = baseObject[propertyName];
    return toProvider[methodName].apply(context, arguments);
  };
};

exports.getMethodList = function getMethodList (obj) {
  return Object.getOwnPropertyNames(obj).filter(function (property) {
    return (typeof obj[property] === 'function');
  });
};
