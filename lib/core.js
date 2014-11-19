/**
 * Module Dependencies
 */
var mini = require('minimist');
var path = require('path');
var phonegapify = require('./phonegapify');
var buildify = require('./buildify');
var serve = require('./clobber/serve');


/**
 * minimist parse options
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
    var localcommand;

    callback = callback || function () {};
    // slice off 'node */phonegap'
    parsed = mini(argv.slice(2), parseOptions);
    
    if (parsed._[0] === 'serve' || parsed._[0] === 'help' || parsed._[0] === 'version') {
        localcommand = require('.' + path.join( '/', 'clobber', parsed._[0]));
        // execute phonegap implementation of the subcommand
        localcommand(argv, callback);
        //pg[parsed._[0]](argv, callback);
    } else if (parsed._[0] === 'local') {

    } else if (parsed._[0] === 'remote') {
        //remote commands are delegated to the build module
        buildify(argv.slice(3), callback);
    } else {
        // all other commands are delegated to the cordova module
        phonegapify(argv.slice(2), callback);
    }
};

/**
 * Module Exports
 */
module.exports = CLICore;
