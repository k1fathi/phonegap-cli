/*!
 * Module dependencies.
 */
var phonegap = require('../main');
var project = require('../phonegap/util/project');
var server = require('connect-phonegap');
var console = require('./util/console');


/**
 * Server Default Settings
 */
var ServeDefaults = {
    port: 3000,
    autoreload: true,
    localtunnel: false
};


/**
 * $ phonegap serve [options]
 *
 * Serves the app on a local web server.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 *     - `e` {Error} is null unless there was an error.
 */

module.exports = function(argv, callback) {
    var options = { 
        port: argv.port || argv.p || ServeDefaults.port,
        autoreload: (typeof options.autoreload === 'boolean') ? options.autoreload : ServeDefaults.autoreload,
        localtunnel: (typeof options.localtunnel === 'boolean') ? options.localtunnel : ServeDefaults.localtunnel,
    };

    callback = callback || function() {};
    
    var self = this;

    // change to project directory and delegate errors
    if (!project.cd({ emitter: self.phonegap, callback: callback })) return;

    /**
     * Start Server
     */
    var startServer = function (self, options) {
//        self.phonegap.emit('log', 'starting app server...');
        server.listen(options)
        .on('error', _errorHandler)
        .on('log', function(statusCode, url) {
//            self.phonegap.emit('log', statusCode, url);
        })
        .on('complete', function(data) {
            callback(null, data);
        });
    }

    // prepare to execute appropriate cordova hooks
    try {
        cordova.prepare([], function(err, data) {
            startServer(self, options);
        });
    } catch (e) {
//        self.phonegap.emit('log', 'no platforms detected in project');
        startServer(self, options);
    }

     if (true) {
         console.log('');
         console.log('ctrl-c to stop the server');
         console.log('');
     }

     callback();
};
