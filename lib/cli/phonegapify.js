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
function PhoneGapify (argv, callback) {
    var originalWD = process.cwd();
    var cdvspawn;

    try {
        process.chdir(cordovapath);
    } catch (e) {
        console.log(e);
    }
    cdvspawn = spawn('cordova', argv, {cwd: originalWD, stdio:'inherit'}); 

    cdvspawn.on('exit', function () {
        callback();
    });

};


/**
 * Module Exports
 */
module.exports = PhoneGapify;
