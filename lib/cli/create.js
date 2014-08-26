/*!
 * Module dependencies.
 */

var phonegap = require('../main'),
    fs = require('fs'),
    path = require('path'),
    fork = require('child_process').fork,
    pgcreate = path.join('..','phonegap','create.js');

// for argv slicing, slice off context (expected: node phonegap create)
var magicslice = 3;

/**
 * @function CLI_CREATE
 *
 * $ phonegap create <path>
 *
 * Create a Cordova-compatible project.
 *
 * @param {PhoneGapCreate~argv}
 * @param {PhoneGapCreate~callback}
 */
function CLI_CREATE(argv, callback) {
    var child;
    
    // fork to run phonegap script  
    child = fork(path.join(__dirname, pgcreate), process.argv);
    // pass down argv with context (node,pg,pgcommad) stripped 
    child.send(process.argv.slice(magicslice));

    /**
     * @type {eventlistener}
     * @param {childevent~message}
     * @param {function} callback to execute when event is received
     */
    child.on('message', function(msg) {
        console.log('message from create child', msg);
        child.disconnect();
    });

    /**
     * @type {eventlistener}
     * @param {childevent~exit}  
     * @param {function} callback to execute when event is received 
     */
    child.on('exit', function(e) {
        console.log(e);
        callback(e);
        console.log("CHILD PROCESS HAS DONE QUIT");
    });
};

/**
 * export CLI_CREATE object only
 * all other definitions should be contained within the module
 */
module.exports = CLI_CREATE;
