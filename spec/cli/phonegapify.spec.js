//
var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

//
var phonegapify = rewire('../../src/cli/phonegapify');



var chdirspy = sinon.spy();
var callback = sinon.spy();

function beforeEach() {
    
    phonegapify.__set__('process.chdir', chdirspy);
    
};

var base_argv = [ 'node', 'something/something/phonegap' ];
var cmd_argv = [ 'create', 'path/to/app' ];


beforeEach();
test("PhoneGapify Module", function (t) {
    t.plan(3);

    t.type(phonegapify, 'function', "should export a function");

    beforeEach();
    t.test("", function (t) {
        t.plan(2);

        // given        
        phonegapify(cmd_argv, callback);

        // then

        t.equal(chdirspy.args[0][0], phonegapify.__get__('cordovapath'),"should change the worknig directory");
        t.equal(chdirspy.callCount, 1, "should change the working directory exactly once");
    });

    beforeEach();
    t.test("", function (t) {
        t.plan(1);

        // given        
        phonegapify(cmd_argv, callback);

        // then
        t.equal(chdirspy.callCount, 2, "");
    });
});
