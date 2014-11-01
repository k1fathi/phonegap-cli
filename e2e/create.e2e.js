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
var spawn = require('child_process').spawn;

/**
 * Paths
 */
var stagedir = path.join('..', 'stage');
var projpath = path.join(stagedir, 'test_project');
var cordovapath = path.join('..', 'node_modules', 'cordova');


/**
 * TESTS
 */
test("phonegap create", function (t) {
    t.plan(3);

    /* phonegap create */
    t.test("when invoked with no arguments", function (t) {
        t.plan(1);

        stage(['create'], function () {
            fs.exists(projpath, function (exists) {
                t.ok(!exists, "cordova project directory should not be created without a path");
            });
        });
    });

    /* phonegap create path */ 
    t.test("when created with no options", function (t) {
        t.plan(5);
        stage(['create', projpath], function () {
            // beware of exists
            fs.exists(projpath, function (exists) {
                t.ok(exists, "cordova project directory exists");
            });

            fs.exists(path.join(projpath, 'config.xml'), function (exists) {
                t.ok(exists, "project has a config.xml file");
            });

            fs.exists(path.join(projpath, 'www'), function (exists) {
                t.ok(exists, "project has a www/");
            });

            fs.exists(path.join(projpath, 'www'), function (exists) {
                t.ok(exists, "project has a platforms/");
            });

            fs.exists(path.join(projpath, 'www'), function (exists) {
                t.ok(exists, "project has a hooks/");
            });
        });
    });

    /* phonegap create path id name */
    t.test("with path id name arguments", function (t) {
        t.plan(5);
        stage(['create', projpath], function () {
            // beware of exists
            fs.exists(projpath, function (exists) {
                t.ok(exists, "cordova project directory exists");
            });

            fs.exists(path.join(projpath, 'config.xml'), function (exists) {
                t.ok(exists, "project has a config.xml file");
            });

            fs.exists(path.join(projpath, 'www'), function (exists) {
                t.ok(exists, "project has a www/");
            });

            fs.exists(path.join(projpath, 'www'), function (exists) {
                t.ok(exists, "project has a platforms/");
            });

            fs.exists(path.join(projpath, 'www'), function (exists) {
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
