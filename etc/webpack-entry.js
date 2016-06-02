
// Save the previous value of the `QC` variable.
var previousQc = global.QC;

const QC = require('.');

/**
 * Run QC.js in *noConflict* mode, returning the `QC` variable to its previous owner.  Returns a reference to the QC
 * object.
 */
QC.noConflict = function () {
  global.QC = previousQc;
  return this;
};

global.QC = QC;
