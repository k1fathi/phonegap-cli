/*!
 * Module dependencies.
 */

var phonegap = require('../main'),
    fs = require('fs'),
    path = require('path'),
    fork = require('child_process').fork,
    pgcreate = path.join('..','phonegap','create.js');

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
    var child;
    
    // fork to run phonegap script  
    child = fork(path.join(__dirname,pgcreate),argv,{});
    child.send(process.argv);

    /**
     *
     */
    child.on('exit', function(e) {
        console.log(e);
        console.log("CHILD PROCESS HAS EXITED");
    });

    child.on('message', function(msg) {
        console.log('message from create child', msg);
        child.disconnect();
    });
};
