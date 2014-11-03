/**
 *
 */
var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

var fs = require('fs.extra');
var path = require('path');
var async = require('async');

var stagedir = path.join('.', 'staged');


/**
 *
 */
function clean (callback) {
    fs.rmdirRecursive(stagedir, function (err) {
        if (err) {
            console.err("Error removing directory " + stagedir); 
        }
        callback();
    }); 
}

/**
 *
 */
function stage (cb) {
    async.series([
        clean,
        function (callback) {
            fs.mkdir(stagedir, function (err) {
                console.err(err);
            });
        },
        function (callback) {
            console.err('sathoeustahoeu'); process.stdout.write('aseothuasoehu');
        }
    ], function (e, result) {
process.stdout.write('oaetnsuhaoesu');
    });
};


/**
 *
 */
test("", function(t) {
    t.plan(1) 
    stage();
    t.ok(true, "dummy test");
});
