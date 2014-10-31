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

beforeEach();
test("PhoneGapify Module", function (t) {
    t.plan(2);

    t.type(phonegapify, 'function', "should export a function");

    beforeEach();
    t.test("should call phonegapify module if command not found", function (t) {
        t.plan(3);

        // given        
        Core(base_argv, callback);

        // then
        t.equal(phonegapispy.callCount, 1, "phonegapispy should be executed exactly once");

        //  
        t.type(phonegapispy.args[0][1], 'function', "phonegapispy should be executed with a callback function");

        // 
        t.equal(callback.callCount, 1, "callback should be executed exactly once");

    });

});
