
function privateMixin (baseObject, metaObject) {
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
}


exports.do = privateMixin;
