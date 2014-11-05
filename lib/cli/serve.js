/*!
 * Module dependencies.
 */
var phonegap = require('../main');
var project = require('../phonegap/util/project');
var server = require('connect-phonegap');


/**
 * Server Default Settings
 */
var ServeDefaults = {
    port: 3000,
    autoreload: true,
    localtunnel: false
};


/**
 * private error handler
 */
var _errorHandler = function (err) {
    self.phonegap.emit('error', err);
    callback(err);
};


/**
 * startServer
 */
function startServer(options, callback) {
    console.log('starting app server...');
//        self.phonegap.emit('log', 'starting app server...');
    server.listen(options)
    .on('error', _errorHandler)
    .on('log', function(statusCode, url) {
        console.log(statusCode, url);
//            iself.phonegap.emit('log', statusCode, url);
    })
    .on('complete', function(data) {
        callback(null, data);
    });

    if (true) {
         console.log('');
         console.log('ctrl-c to stop the server');
         console.log('');
     }
};


/**
 * Serve 
 *   async function which initializes the server module
 * Options:
 *
 * @param {object} args
 * @param {function} callback(err)
 * @return
 */
function Serve (args, callback) {
    var self = this;
    var options = { 
        port: args.port || args.p || ServeDefaults.port,
        autoreload: args.autoreload,
        localtunnel: args.localtunnel
    };

    callback = callback || function() {};

    // change to project directory, reporting any error to callback and returning
    if (!project.cd()) {
        callback(new Error("Error when changing to project directory"));
        return;
    }

    // prepare to execute appropriate cordova hooks
    try {
        cordova.prepare([], function(err, data) {});
    } catch (e) {
//        self.phonegap.emit('log', 'no platforms detected in project');
    }
    startServer(options, callback);
};

/* Module Exports */
module.exports = Serve;
