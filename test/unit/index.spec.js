
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
} else {
  QC = global.QC;
}

describe('QC', function () {

  describe('.noop', function () {

    it('should return `undefined`', function () {
      expect(QC.noop()).toBeUndefined();
    });

  });

  describe('.notAgain', function () {

    it('should throw an error', function () {
      expect(function () {
        QC.notAgain();
      }).toThrow();
    });

  });

  describe('.nullFn', function () {

    it('should return `null`', function () {
      expect(QC.nullFn()).toBeNull();
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
