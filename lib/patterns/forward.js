var tools = require('../tools');

function forward (baseObject, metaObject) {
  var methodNames = tools.getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  while (index--) {
    methodName = methodNames[index];
    baseObject[methodName] = tools.apply(metaObject, methodName, metaObject);
  }

  return baseObject;
}


exports.do = forward;
