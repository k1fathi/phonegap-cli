/**
 *
 */
var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

var fs = require('fs.extra');
var path = require('path');
var async = require('async');
var shell = require('shelljs');
var spawn = require('child_process').spawn;

var stagedir = path.join('.', 'staged');
var cordovapath = path.join('..', 'node_modules', 'cordova');



/**
 *
 */
function clean (callback) {
    fs.rmrf(stagedir, function (err) {
        if (err) {
            console.err("Error removing directory " + stagedir); 
        }
        callback();
    }); 
}

/**
 *
 */
function stage (args, cb) {
    var origwd = process.cwd();

    async.series([
        clean,
        function (callback) {
            fs.mkdir(stagedir, function (err) {
                callback();
            });
        },
        function (callback) {
            process.chdir(cordovapath);
            spawn('cordova', args, {cwd: origwd, stdio:'inherit'}); 
        } 
    ], function (e, result) {
    });
};


/**
 *
 */
test("Project Creation", function(t) {
    t.plan(3);

    stage(['create', stagedir], function () {});

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
});
