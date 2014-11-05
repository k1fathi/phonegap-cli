//
var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

/* rewire module under test */
var phonegapify = rewire('../lib/phonegapify');

var chdirspy = sinon.spy();
var spawnspy = sinon.stub().returns({on: function (code, callback) {callback()}});
var callback = sinon.spy();

/**
 *
 */
function beforeEach() {
    phonegapify.__set__('process.chdir', chdirspy);
    phonegapify.__set__('spawn', spawnspy);
};

var base_argv = [ 'node', 'something/something/phonegap' ];
var cmd_argv = [ 'create', 'path/to/app' ];

/**
 *
 */
beforeEach();
test("PhoneGapify Module", function (t) {
    t.plan(3);

    t.type(phonegapify, 'function', "should export a function");

    beforeEach();
    t.test("invoking phonegapify with an argument list", function (t) {
        t.plan(5);

        // given        
        phonegapify(cmd_argv, callback);

        // then
        t.equal(chdirspy.args[0][0], phonegapify.__get__('cordovapath'),"should change the working directory");
        t.ok(chdirspy.calledOnce, "should change the working directory exactly once");

        t.ok(spawnspy.calledOnce, "should call child_process.spawn");
        t.equal(spawnspy.args[0][0], 'cordova', "should spawn with 'cordova' as first argument");
        t.equal(spawnspy.args[0][1], cmd_argv, "should call spawn with unmoddified arguments");

    });
    
    beforeEach();
    t.test("if cordova is missing", function (t) {
        t.plan(1);

        // given        
        phonegapify(cmd_argv, callback);

        // then
        t.equal(chdirspy.callCount, 2, "");
    });
});



