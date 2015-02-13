# [prototype-less](https://github.com/luscus/prototype-less)

[![NPM](https://nodei.co/npm/prototype-less.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/prototype-less/)
[![NPM](https://nodei.co/npm-dl/prototype-less.png?months=2&height=3)](https://nodei.co/npm/prototype-less/)

[![NPM version](https://img.shields.io/npm/v/prototype-less.svg?style=flat)](https://www.npmjs.com/package/prototype-less "View this project on NPM")
[![David](https://img.shields.io/david/luscus/prototype-less.svg?style=flat)](https://david-dm.org/luscus/prototype-less)
[![David](https://img.shields.io/david/dev/luscus/prototype-less.svg?style=flat)](https://david-dm.org/luscus/prototype-less#info=devDependencies)
[![NPM license](https://img.shields.io/npm/l/prototype-less.svg?style=flat)](https://www.npmjs.com/package/prototype-less "View this project on NPM")
[![Omniref](https://img.shields.io/badge/Omniref-docs-orange.svg?style=flat)](https://www.omniref.com/js/npm/prototype-less)
[![flattr](https://img.shields.io/badge/flattr-donate-yellow.svg?style=flat)](http://flattr.com/thing/3817419/luscus-on-GitHub)

The whole package was inspired by a post by Reginald “Raganwald” Braithwaite: [Mixins, Forwarding, and Delegation in JavaScript](http://raganwald.com/2014/04/10/mixins-forwarding-delegation.html)

Provides helper functions to structure software using prototype-less techniques: mixin, forwarding and delegation.

The general idea is to separate the model domain from the implementation domain: separate properties (data) from behaviours (methods).

## Installation

### Node Dependency

Execute following line

    npm install prototype-less@0.0.x --save


### Require module

    var pless = require('prototype-less');


## Methods

Method Matrix (used context to [resolving time](http://programmers.stackexchange.com/a/200123))

 Used Context | Early Bound  | Late Bound    | Later Bound (State Machines)
------------- | ------------ | ------------- | -------------
BaseObject    | [mixin](#mixin)        | [delegate](#delegate)      | [dynamicDelegate](#dynamicDelegate)
[MetaObject](http://en.wikipedia.org/wiki/Metaobject)    | [privateMixin](#privateMixin) | [forward](#forward)       | [dynamicForward](#dynamicForward)

### <a name="mixin"></a> mixin

Parameters:

- `baseObject`: some Object to be extended.
- `metaObject`: the template to be applied to the baseObject.

Our person object is a template (metaobject), it provides some functionality to be mixed into an object.

    // extends a domain with behaviours,
    // but behaviours access and modifies baseobject's properties
    pless.mixin(raganwald, person);

### <a name="privateMixin"></a> privateMixin

Parameters:

- `baseObject`: some Object to be extended.
- `metaObject`: the template to be applied to the baseObject.

Same as `mixin` but the properties related to the injected behavior are kept private.

    var hasCareer = {
      career: function () {
        return this.chosenCareer;
      },
      setCareer: function (career) {
        this.chosenCareer = career;
        return this;
      },
      chosenCareer: 'unemployed' // initial value
    };

    // extends a domain with behaviours,
    // but keeps behaviour specific properties private
    // example here: this.chosenCareer
    // the property won't be attached to Object "raganwald"
    pless.privateMixin(raganwald, hasCareer);

### <a name="forward"></a> forward

Parameters:

- `baseObject`: object issuing the call.
- `metaObject`: object providing behaviour and context.

Creates a relationship between Objects. Here the function is provided by the metaobject and it is executed using the metaobject's context.

### <a name="delegate"></a> delegate

Parameters:

- `baseObject`: object issuing the call and providing context.
- `metaObject`: object providing behaviour.

Creates a relationship between Objects. Here the function is provided by the metaobject and it is executed using the baseobject's context.

### <a name="dynamicForward"></a> dynamicForward

Parameters:

- `baseObject`: object issuing the call.
- `metaObject`: object providing behaviour and context.
- `propertyName`: baseObject property to which the metaobject will be bound.

Same as `forward` but the target of the forwarding (metaobject) is late bound: it is solved at run-time and opens applications  for modeling classes of behaviour that change dynamically (as state machines).

### <a name="dynamicDelegate"></a> dynamicDelegate

Parameters:

- `baseObject`: object issuing the call and providing context.
- `metaObject`: object providing behaviour.
- `propertyName`: baseObject property to which the metaobject will be bound.

Same as `delegate` but the target of the delegation (metaobject) is late bound: it is solved at run-time and opens applications  for modeling classes of behaviour that change dynamically (as state machines).


------------

Copyright (c) 2015 Luscus (luscus.redbeard@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
