/**
 * tesing dependencies
 */
var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

/**
 * staging dependencies
 */
var fs = require('fs.extra');
var path = require('path');
var async = require('async');
var shell = require('shelljs');
var spawn = require('child_process').spawn;

/**
 * Paths
 */
var stagedir = path.join('.', 'staged');
var cordovapath = path.join('..', 'node_modules', 'cordova');



/**
 *
 */
test("phonegap create", function (t) {
    t.plan(1);
    
    t.test("when created with no options", function (t) {
        t.plan(5);
        stage(['create', stagedir], function () {
            // beware of exists
            fs.exists(stagedir, function (exists) {
                t.ok(exists, "cordova project directory exists");
            });

            fs.exists(path.join(stagedir, 'config.xml'), function (exists) {
                t.ok(exists, "project has a config.xml file");
            });

            fs.exists(path.join(stagedir, 'www'), function (exists) {
                t.ok(exists, "project has a www/");
            });

            fs.exists(path.join(stagedir, 'www'), function (exists) {
                t.ok(exists, "project has a platforms/");
            });

            fs.exists(path.join(stagedir, 'www'), function (exists) {
                t.ok(exists, "project has a hooks/");
            });
        });
    });
});


/**
 * teardown the stage after testing
 */
function teardown (callback) {
    fs.rmrf(stagedir, function (err) {
        if (err) {
            console.error("Error removing directory " + stagedir); 
        }
        callback();
    }); 
}

/**
 * set up the stage for testing
 */
function stage (args, cb) {
    var origwd = process.cwd();

    async.series([
        teardown,
        function (callback) {
            fs.mkdir(stagedir, function (err) {
                callback();
            });
        },
        function (callback) {
            process.chdir(cordovapath);
            child = spawn('cordova', args, {cwd: origwd, stdio:'inherit'});

            child.on('exit', function(err){
                process.chdir(origwd);
                cb();
            });
        } 
    ], function (err, result) {
        console.error('staging error');
    });
};
