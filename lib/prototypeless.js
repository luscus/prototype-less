

var prototypeLess = {};


prototypeLess.mixin = function (baseObject, metaObject) {
  extend(true, baseObject, metaObject);

  return baseObject;
}

prototypeLess.privateMixin = function (baseObject, metaObject) {
  var methodNames = getMethodList(metaObject),
      privateProperty = Object.create(null),
      index = methodNames.length,
      methodName;

  while (index--) {
    methodName = methodNames[index];
    baseObject[methodName] = metaObject[methodName].bind(privateProperty);
  };

  return baseObject;
}

prototypeLess.forward = function (baseObject, metaObject) {
  var methodNames = getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  while (index--) {
    methodName = methodNames[index];
    baseObject[methodName] = function () {
      return metaObject[methodName].apply(metaObject, arguments);
    };
  });

  return baseObject;
}

prototypeLess.delegate = function (baseObject, metaObject) {
  var methodNames = getMethodList(deputy),
      index = methodNames.length,
      methodName;

  while (index--) {
    methodName = methodNames[index];
    baseObject[methodName] = function () {
      return metaObject[methodName].apply(baseObject, arguments);
    };
  });

  return baseObject;
}

prototypeLess.laterForward = function (baseObject, metaObject, propertyName) {
  var methodNames = getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  while (index--) {
    methodName = methodNames[index];
    baseObject[methodName] = function () {
      var toProvider = baseObject[propertyName];
      return toProvider[methodName].apply(metaObject, arguments);
    };
  });

  return baseObject;
}

prototypeLess.laterDelegate = function (baseObject, metaObject, propertyName) {
  var methodNames = getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  while (index--) {
    methodName = methodNames[index];
    baseObject[methodName] = function () {
      var toProvider = baseObject[propertyName];
      return toProvider[methodName].apply(baseObject, arguments);
    };
  });

  return baseObject;
}

function extend () {
  var baseObject = arguments[0],
      metaObjects = __slice.call(arguments, 1),
      index = metaObjects.length,
      methodNames,
      methodIndex,
      methodName,
      metaObject,
      key;

  while (index--) {
    metaObject = metaObjects[index];
    methodNames = getMethodList(metaObject),
      methodIndex = methodNames.length;

    while (methodIndex--) {
      methodName = methodNames[methodIndex];
      baseObject[methodName] = metaObject[methodName];
    };
  };

  return baseObject;
};

function getMethodList (obj) {
  return obj.getOwnPropertyNames().filter(function (property) {
    return (typeof obj[property] === 'function');
  });
}

module.exports = prototypeLess;
