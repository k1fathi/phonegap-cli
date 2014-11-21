/**
 * Module Dependencies
 */
var path = require('path');
var package = require(path.join(__dirname, '..', '..', 'package'));

/**
 * Version
 *
 */
function Version(argv, callback) {
    console.log(package.version);
    callback(package.version);
};

/**
 * Module Exports
 */
module.exports = Version;
