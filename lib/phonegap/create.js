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
 *
 *
 */
function CreateCommand (msg) {
    var version,
        uri;
console.log(msg);
    // construct uri to default app
    version = phonegap.version().phonegap;
    uri = 'https://github.com/phonegap/phonegap-app-hello-world/archive/' + version + '.tar.gz';

    // customize default app
    cordova.config(msg[2], {
        lib: {
            www: {
                id: msg[3],
                version: version,
                uri: uri
            }
        }
    });

    // create local project, passing it the unaltered command line arguments received
    cordova.create(msg[2], msg[3], msg[4], function(e) {
/*        var cfgPath = path.join(options.path, 'www', 'config.xml'),
            cfgParser = null;
*/
//        self.phonegap.emit('log',PG_STR['args'], options.path, options.id, options.name);
        if (e) {
            phonegap.emit('error', e);
            //callback(e);
            process.send({'error':e});
            return;
        }
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
        phonegap.emit('log', pgstring['created'], msg[2]);
        process.send({'log': pgstring['created']})
        //callback(null);
    });
};

process.on('message', CreateCommand);
