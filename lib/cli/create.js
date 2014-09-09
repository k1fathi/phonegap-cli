/*!
 * Module dependencies.
 */

var phonegap = require('../main'),
    fs = require('fs'),
    path = require('path'),
    ciparser = require('./argv'),
    help = require('./help'), 
    child_process = require('child_process'),
    pgcreate = path.join('..','phonegap','create.js');

// for argv slicing, slice off context (expected: node phonegap create)
var magicslice = 1;

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
    
    
    if (argv.length === 3) {
        help(argv, callback);
        return;    
    } 
    
    // fork to run phonegap script, provides process.argv for context  
    var fullpath = path.join(__dirname, pgcreate);
    child = child_process.fork(fullpath, argv);
    // pass down argv with context (node,pg,pgcommad) stripped 
    child.send(argv);

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
