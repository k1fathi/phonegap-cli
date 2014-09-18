/*!
 * Module dependencies.
 */
var Command = require('./util/command'),
    cordova = require('cordova-lib').cordova,
    ConfigParser = require('cordova-lib').configparser,
    shell = require('shelljs'),
    path = require('path'),
    util = require('util'),
    fs = require('fs');

// main phonegap module dependency gets utility functions and additional commands
var phonegap = require('../main.js');

var pgstring = {
    'created' : 'created project at',
    'args' : 'create called with the options',
    'custconfig' : 'Customizing default config.xml file',
};

/**
 * enum for possible msg fields
 * @enum {number}
 */
var ARGS = {
    PATH  : 0,
    ID    : 1,
    NAME  : 2,
    OTHER : 3
};

/**
 * @function CreateCommand
 * 
 * @param {msg} array of arguments to be passed to cordova.
 */
function CreateCommand (msg) {
    var version,
        uri,
        path = msg[0],
        id = msg[1],
        name = msg[2],
        other;

    if (!msg) {
        process.send({log: 'CreateCommand run with no arguments'});
        throw new Error("CreateCommand received no message from parent process");
    } 

    if (!msg.path) {
        process.send({log: 'CreateCommand run without path specified in message'});
        throw new Error("CreateCommand received message with undefined path");
    }

    // construct uri to default app
    version = phonegap.version().phonegap;
    uri = 'https://github.com/phonegap/phonegap-app-hello-world/archive/' + version + '.tar.gz';

    // customize default app
    cordova.config(path, {
        lib: {
            www: {
                id: name,
                version: version,
                uri: uri
            }
        }
    });

    // create local project, passing it the unaltered command line arguments received
    cordova.create( msg.path, msg.id || 'com.phonegap.helloworld', msg.name || 'HelloWorld', function(e) {
//        var cfgPath = path.join(options.path, 'www', 'config.xml'),
//            cfgParser = null;
//        console.log('log', pgstring['args'], path, id, name, other);
        
        if (e) {
            process.send({'error':e});
            return;
        }

//        process.send({'log': pgstring['created'] + ' ' + path})
/*
        // Write out id and name to config.xml
        if(fs.existsSync(cfgPath)) {

            self.phonegap.emit('log',PG_STR['custconfig']);

            cfgParser = new ConfigParser(cfgPath);
            cfgParser.setPackageName(options.id);
            cfgParser.setName(options.name);
            cfgParser.write();
        }
*/
        return;
    });
    return true;
};


/**
 * Module Exports
 */
module.exports = CreateCommand;

/**
 * register message listener on execution
 */
process.on('message', CreateCommand);
