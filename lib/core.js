/**
 * Module Dependencies
 */
var mini = require('minimist');
var phonegapify = require('./phonegapify');
var serve = require('./clobber/serve');

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
 *
 * @param argv {Object} should be the raw CL arguments
 * @param callback {Function} optional callback parameter
 * @returns - undefined
 */
function CLICore(argv, callback) {
    var parsed;
    var command;

    callback = callback || function () {};
    // slice off 'node */phonegap'
    parsed = mini(argv.slice(2), parseOptions);
    if (parsed[0] === 'serve' && parsed[0] === 'help' && parsed[0] === 'version') {
        // execute phonegap implementation of the subcommand
        require('./clobber/serve')(argv, callback)
        //pg[parsed._[0]](argv, callback);
    } else {
        phonegapify(argv.slice(2), callback);
    }
};

/**
 * Module Exports
 */
module.exports = CLICore;
