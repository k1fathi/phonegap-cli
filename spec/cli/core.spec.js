var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

var Core = rewire('../../src/cli/core');


var phonegapify = sinon.stub().callsArg(1);
var callback = sinon.spy();

function beforeEach() {
    phonegapify.callsArg(1);
    Core.__set__('phonegapify',   phonegapify);
    
};

var base_argv = [ 'node', 'something/something/phonegap' ];

beforeEach();
test("CLI Core Module", function (t) {
    t.plan(2);

    t.type(Core, 'function', "should export a function");

    beforeEach();
    t.test("should call phonegapify module if command is not overwritten", function (t) {
        t.plan(3);
        
        Core(base_argv, sinon.spy());
        t.equal(phonegapify.callCount, 1, "call count should be exactly 1");
        t.type(phonegapify.args[0][1], 'function', "phonegapify should be called with a callback function");
        t.equal(callback.callCount, 1, "call count should be exactly 1");

    });

});
