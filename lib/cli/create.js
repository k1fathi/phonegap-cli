/*!
 * Module dependencies.
 */

var phonegap = require('../main'),
    fs = require('fs'),
    path = require('path'),
    fork = require('child_process').fork;

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
console.log (__dirname);
    // create the project
    var child = fork(path.join(__dirname,'../phonegap/test.js'),argv,{});
        child.send(process.argv);
    child.on('exit', function(e) {
        console.log("CHILD PROCESS HAS EXITED");
    });
};
