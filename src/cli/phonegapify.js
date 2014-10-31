/**
 * Module Dependencies
 */
var path = require('path');
var spawn = require('child_process').spawn;


var cdvpath = path.join( '..', '..', 'node_modules', 'cordova');


/**
 * PhoneGapify
 *
 * @argv {Object} should be the raw CL arguments 
 * @callback {Function} callback to execute when operation is complete
 */
function PhoneGapifyModule (argv, callback) {
    console.log(argv);
    spawn('./'+cdvpath, argv); 
    
};


/**
 * Module Exports
 */
module.exports = PhoneGapifyModule;
