/**
 * Module Dependencies
 */
var mini = require('minimist');

var phonegap = require('../phonegap');
var phonegapify = require('./phonegapify');


/**
 *
 */
parseOptions = {
    boolean : [ 'd', 'device',
                'e', 'emulator',
                'd', 'verbose',
                'v', 'version',
                'h', 'help',
                'autoreload',
                'localtunnel'
              ],
    default : {
        'autoreload' : true,
        'localtunnel': false
    }
};


/**
 * delegates to the appropriate handler for the arguments received
 * @param argv {Object} should be the raw CL arguments
 * @param callback {Function} optional callback parameter
 * @returns - undefined
 */
function CLICore(argv, callback) {
    var parsed,
        command;

    callback = callback || function () {};

    // slice off 'node */phonegap'
    parsed = mini(argv.slice(2), parseOptions);
    if (phonegap.subcommands.indexOf(parsed._[0]) > -1 && typeof phonegap[parsed._[0]] === 'function') {
        // execute phonegap implementation of the subcommand    
    } else {
        phonegapify(parsed, callback);
    }
};


/**
 * Module Exports
 */
module.exports = CLICore;
