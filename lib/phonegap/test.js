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



function CreateCommand (msg) {
    console.log(msg);
    console.log("child process, initialized modules");
   
    // customize default app
    cordova.config(options.path, {
        lib: {
            www: {
                id: options.id,
                version: version,
                uri: uri
            }
        }
    });

    // create local project
    cordova.create(options.path, options.id, options.name, function(e) {
        var cfgPath = path.join(options.path, 'www', 'config.xml'),
            cfgParser = null;

        self.phonegap.emit('log',PG_STR['args'], options.path, options.id, options.name);

        if (e) {
            self.phonegap.emit('error', e);
            callback(e);
            return;
        }

        // Write out id and name to config.xml
        if(fs.existsSync(cfgPath)) {

            self.phonegap.emit('log',PG_STR['custconfig']);

            cfgParser = new ConfigParser(cfgPath);
            cfgParser.setPackageName(options.id);
            cfgParser.setName(options.name);
            cfgParser.write();
        }

        self.phonegap.emit('log', PG_STR['created'], options.path);
        callback(null);
    });

};

process.on('message', CreateCommand);
