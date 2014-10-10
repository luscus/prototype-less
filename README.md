# [prototype-less](https://github.com/luscus/prototype-less)
[![dependencies](https://david-dm.org/luscus/prototype-less.svg)](https://david-dm.org/luscus/prototype-less)
[![devDependency Status](https://david-dm.org/luscus/prototype-less/dev-status.svg?theme=shields.io)](https://david-dm.org/luscus/prototype-less#info=devDependencies)

The whole package was inspired by a post by Reginald “Raganwald” Braithwaite: [Mixins, Forwarding, and Delegation in JavaScript](http://raganwald.com/2014/04/10/mixins-forwarding-delegation.html)

Provides helper functions to structure software using prototype-less techniques: mixin, fowarding and delegation.

## Installation

### Node Dependency

Execute following line

    npm install prototype-less@0.0.x --save


### Require module

    var pless = require('prototype-less');


## Methods

Method Matrix (context/resolving time)

 Used Context | Early Bound  | Late Bound    | Later Bound (State Machines)
------------- | ------------ | ------------- | -------------
BaseObject    | mixin        | delegate      | laterDelegate
[MetaObject](http://en.wikipedia.org/wiki/Metaobject)    | privateMixin | forward       | laterForward

### mixin

Parameters:

- `baseObject`: some Object to be extended.
- `metaObject`: the template to be applied to the baseObject.

Our person object is a template (metaobject), it provides some functionality to be mixed into an object. More than one template can be provided.

    // extends a domain with behavious,
    // but behaviours access and modifies baseobject's properties
    pless.mixin(raganwald, person, male);

### privateMixin

Parameters:

- `baseObject`: some Object to be extended.
- `metaObject`: the template to be applied to the baseObject.

Same as `mixin` but the properties related to the injected behavior are kept private.

    // extends a domain with behavious,
    // but keeps behaviour specific properties private
    // here: this.chosenCareer
    pless.privateMixin(raganwald, hasCareer);

### forward

Parameters:

- `baseObject`: object issuing the call.
- `metaObject`: object providing behaviour and context.

Creates a relationship between Objects. Here the function is provided by the metaobject and it is executed using the metaobject's context.

### delegate

Parameters:

- `baseObject`: object issuing the call and providing context.
- `metaObject`: object providing behaviour.

Creates a relationship between Objects. Here the function is provided by the metaobject and it is executed using the baseobject's context.

### laterForward

Parameters:

- `baseObject`: object issuing the call.
- `metaObject`: object providing behaviour and context.
- `propertyName`: baseObject property to which the metaobject will be bound.

Same as `forward` but the target of the forwarding (metaobject) is late bound: it is solved at run-time and opens applications  for modeling classes of behaviour that change dynamically (as state machines).

### laterDelegate

Parameters:

- `baseObject`: object issuing the call and providing context.
- `metaObject`: object providing behaviour.
- `propertyName`: baseObject property to which the metaobject will be bound.

Same as `delegate` but the target of the delegation (metaobject) is late bound: it is solved at run-time and opens applications  for modeling classes of behaviour that change dynamically (as state machines).
