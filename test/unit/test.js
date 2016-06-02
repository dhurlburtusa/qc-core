
/*
 * This script does a simple test to confirm that the main package entry point is structured as expected.
 */

'use strict';

console.log('Starting node test...');

const QC = require('../../');

console.assert(typeof QC == 'object', '`QC` should be an object');
console.assert(typeof QC.noop == 'function', '`QC.noop` should be a function');
console.assert(typeof QC.notAgain == 'function', '`QC.notAgain` should be a function');
console.assert(typeof QC.nullFn == 'function', '`QC.nullFn` should be a function');

console.log('Finished node test');
