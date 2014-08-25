/*!
 * Module dependencies.
 */

var phonegap = require('../main'),
    fs = require('fs'),
    spawn = require('child_proces').spawn;

/**
 * $ phonegap create <path>
 *
 * Create a Cordova-compatible project.
 *
 * Options:
 *
 *   - `argv` {Object} is an optimist object.
 *   - `callback` {Function} is a completion callback.
 *     - `e` {Error} is null unless there was an error.
 */

module.exports = function(argv, callback) {
    // create the project
    phonegap.create(argv, function(e) {
        callback(e);
    });
};
