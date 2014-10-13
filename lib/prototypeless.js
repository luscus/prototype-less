

var prototypeLess = {};


prototypeLess.mixin = function () {
  extend.apply(this, arguments);

  return arguments[0];
};

prototypeLess.privateMixin = function (baseObject, metaObject) {
  var propertyNames = Object.getOwnPropertyNames(metaObject),
      propertyIndex = propertyNames.length,
      privateContext = Object.create(null),
      index = propertyNames.length,
      propertyName;

  while (index--) {
    propertyName = propertyNames[index];

    if (typeof metaObject[propertyName] === 'function') {
      baseObject[propertyName] = metaObject[propertyName].bind(privateContext);
    }
    else {

      // extends the private context with the property and its value
      privateContext[propertyName] = metaObject[propertyName];
    }
  }

  return baseObject;
};

prototypeLess.forward = function (baseObject, metaObject) {
  var methodNames = getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  while (index--) {
    methodName = methodNames[index];
    baseObject[methodName] = apply(metaObject, methodName, metaObject);
  }

  return baseObject;
};

prototypeLess.delegate = function (baseObject, metaObject) {
  var methodNames = getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  while (index--) {
    methodName = methodNames[index];
    baseObject[methodName] = apply(metaObject, methodName, baseObject);
  }

  return baseObject;
};

prototypeLess.dynamicForward = function (baseObject, metaObject, propertyName) {
  var methodNames = getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  baseObject[propertyName] = {};

  while (index--) {
    methodName = methodNames[index];
    //baseObject[propertyName][methodName] = dynamicApply(baseObject, propertyName, methodName, metaObject);
    baseObject[propertyName][methodName] = apply(metaObject, methodName, metaObject);
  }

  return baseObject;
};

prototypeLess.dynamicDelegate = function (baseObject, metaObject, propertyName) {
  var methodNames = getMethodList(metaObject),
      index = methodNames.length,
      methodName;

  baseObject[propertyName] = {};

  while (index--) {
    methodName = methodNames[index];
    //baseObject[propertyName][methodName] = dynamicApply(baseObject, propertyName, methodName, baseObject);
    baseObject[propertyName][methodName] = apply(metaObject, methodName, baseObject);
  }

  return baseObject;
};


function apply (metaObject, methodName, context) {
  return function () {
    return metaObject[methodName].apply(context, arguments);
  };
}

function dynamicApply (baseObject, propertyName, methodName, context) {
  return function () {
    var toProvider = baseObject[propertyName];
    return toProvider[methodName].apply(context, arguments);
  };
}

function extend () {
  var baseObject = arguments[0],
      metaObjects = Array.prototype.slice.call(arguments, 1),
      index = metaObjects.length,
      propertyNames,
      propertyIndex,
      propertyName,
      metaObject;

  while (index--) {
    metaObject = metaObjects[index];
    propertyNames = Object.getOwnPropertyNames(metaObject);
    propertyIndex = propertyNames.length;

    while (propertyIndex--) {
      propertyName = propertyNames[propertyIndex];
      baseObject[propertyName] = metaObject[propertyName];
    }
  }

  return baseObject;
}

function getMethodList (obj) {
  return Object.getOwnPropertyNames(obj).filter(function (property) {
    return (typeof obj[property] === 'function');
  });
}

module.exports = prototypeLess;
