/**
 * Module Dependencies
 */
var path = require('path');
var spawn = require('child_process').spawn;

var cdvpath = path.join( __dirname, '..', '..', 'node_modules', 'cordova');

/**
 * PhoneGapify
 *
 * @argv {Object} should be the raw CL arguments 
 * @callback {Function} callback to execute when operation is complete
 */
function PhoneGapifyModule (argv, callback) {
    var originalWD = process.cwd();

    process.chdir(cdvpath);

    spawn('cordova', argv, {cwd: originalWD}); 
    
};


/**
 * Module Exports
 */
module.exports = PhoneGapifyModule;
