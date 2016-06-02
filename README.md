# qc-core

The core module of the QC ecosystem.  This module is intended to be isomorphic.  That is, it is designed
to run on node or in a modern browser.


## Install

```bash
npm install qc-core
```

To avoid potential issues, update `npm` before installing:

```bash
npm install npm -g
```


## Node Usage

```js
import { noop, notAgain, nullFn } from 'qc-core';

const Base = function () {
  this.init.apply(this, arguments);
};

Base.prototype.init = noop;

// Define a readonly property named foo.
Object.defineProperty(Base.prototype, 'foo', {
  configurable: true,
  enumerable: true,
  // The `foo` property is `null` until a subclass redefines it.
  get: nullFn
});


const SubClass = function () {
  Base.apply(this, arguments);
};

SubClass.prototype = Object.create(Base.prototype);
SubClass.prototype.constructor = SubClass;

// Redefine the foo property to return 'foo' instead of `null`.
Object.defineProperty(SubClass.prototype, 'foo', {
  configurable: true,
  enumerable: true,
  get() {
    return 'foo';
  }
});


const SubSubClass = function () {
  SubClass.apply(this, arguments);
};

SubSubClass.prototype = Object.create(SubClass.prototype);
SubSubClass.prototype.constructor = SubSubClass;

SubSubClass.prototype.init = function () {
  ...
  this.init = notAgain; // Will throw an error if `init` gets called again.
};

```


## Browser Usage

ES2015 (aka ES6) features are used where supported by Node.  Since many browsers still don't support the
same ES6 features that Node supports, the JavaScript source will need to be transpiled before using.
The source is tested with Babel.  After transpiling, it is recommended that the transpiled source be bundled
into a single file.  To test that the transpiled source runs correctly when bundled, Webpack is used.
