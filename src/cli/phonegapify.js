/**
 * Module Dependencies
 */
var path = require('path');
var spawn = require('child_process').spawn;

var cordovapath = path.join( __dirname, '..', '..', 'node_modules', 'cordova');

/**
 * PhoneGapify
 *
 * @argv {Object} should be the raw CL arguments 
 * @callback {Function} callback to execute when operation is complete
 */
function PhoneGapifyModule (argv, callback) {
    var originalWD = process.cwd();

    try {
        process.chdir(cordovapath);
    } catch (e) {
        console.log(e);
    }
    spawn('cordova', argv, {cwd: originalWD, stdio:'inherit'}); 
};


/**
 * Module Exports
 */
module.exports = PhoneGapifyModule;
