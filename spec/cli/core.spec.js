var test = require('tap').test;
var sinon = require('sinon');

var Core = require('../../src/cli/core');
var phonegapify = require('../../src/cli/phonegapify');
var mini = require('minimist');


var base_argv = [ 'node', 'something/something/phonegap' ];

test("CLI Core Module", function (t) {
    t.plan(2);

    t.type(Core, 'function', "should export a function");

    t.test("should call phonegapify module if command is not overwritten", function (t) {
        t.plan(1);
        var gapifyspy = sinon.spy(phonegapify);        

        Core(base_argv, sinon.spy());

        t.equal(gapifyspy.callCount, 0, "call count should be exactly 1")

    });

});
