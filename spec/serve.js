/* test dependencies */
var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

/* rewire module under test */
var serve = rewire('../lib/cli/serve');

/* define spies */
//var listenspy = sinon.stub().returns({on:sinon.spy()});
var serverstub = {};
var serveonspy = sinon.spy();
var cdspy = sinon.stub().returns(true);
var callback = sinon.spy();

var onstub = { on: function() { return onstub; }}


/* setup spies/stubs/mocks */
function beforeEach() {
    serverstub.listen = sinon.stub().returns(onstub);
    serve.__set__('server', serverstub);
    serve.__set__('project.cd', cdspy);
};

var valid_options = {port: 3000, autoreload: true, localtunnel: false};


/* TESTS */
beforeEach();
test("Serve Module", function (t) {
    t.plan(2);

    /* trivial state test */
    t.type(serve, 'function', "should export a function");

    /* invoking with valid arguments */
    beforeEach();
    t.test("invoking serve with a valid argument list", function (t) {
        t.plan(1);

        // given        
        serve(valid_options, callback);

        // then
        t.equal(cdspy.callCount, 1, "should attempt to change the working directory to the project directory");
        //t.equal(listenspy.callCount, 1, "should call the server module once");
//        t.type(serverspy.args[0][0], 'function', "should invoke the server module with self");
//        t.equal(serverspy.args[0][1], valid_options, "should invoke the server module with the received options");

        
//        t.equal(spawnspy.callCount, 1, "should call child_process.spawn");
//        t.equal(spawnspy.args[0][0], 'cordova', "should spawn with 'cordova' as first argument");
//        t.equal(spawnspy.args[0][1], cmd_argv, "should call spawn with unmoddified arguments");
    });
});
