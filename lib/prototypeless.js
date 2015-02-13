/* jshint node:true */
'use strict';

var mixin           = require('./patterns/mixin'),
    privateMixin    = require('./patterns/privateMixin'),
    forward         = require('./patterns/forward'),
    delegate        = require('./patterns/delegate'),
    dynamicForward  = require('./patterns/dynamicForward'),
    dynamicDelegate = require('./patterns/dynamicDelegate'),
    prototypeLess   = {};

prototypeLess.mixin           = mixin.do;
prototypeLess.privateMixin    = privateMixin.do;
prototypeLess.forward         = forward.do;
prototypeLess.delegate        = delegate.do;
prototypeLess.dynamicForward  = dynamicForward.do;
prototypeLess.dynamicDelegate = dynamicDelegate.do;


module.exports = prototypeLess;
