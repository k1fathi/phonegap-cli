/**
 * Module Dependencies
 */
var path = require('path');

/**
 * Version
 *
 */
function Version(argv, callback) {
    var package = require(path.join(__dirname, '..', '..', 'package'));
    console.log(package.version);
    callback(package.version);
};

/**
 * Module Exports
 */
module.exports = Version;
