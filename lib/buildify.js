/**
 * Module Dependencies
 */
var path = require('path');
var spawn = require('child_process').spawn;

var buildpath = path.join( __dirname, '..', 'node_modules', 'phonegap-build');

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
        process.chdir(buildpath);
    } catch (e) {
        console.log(e);
    }
console.log('pg build module')
    cdvspawn = spawn('pgbuild', argv, {cwd: originalWD, stdio:'inherit'}); 

    // exit event handler
    cdvspawn.on('exit', function (code, signal) {
        callback();
        process.exit(code);
    });
};

/**
 * Module Exports
 */
module.exports = PhoneGapify;
