/* test dependencies */
var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

/* rewire module under test */
var serve = rewire('../lib/serve');

/* define spies */
var serverstub; 
var cdspy; 
var callbackspy; 
var onstub;
var serverret;

/* setup spies/stubs/mocks */
function beforeEach() {
    
    /* instantiate spies*/
    serverstub = {};
    serverstub.listen = sinon.stub();
    cdspy = sinon.stub().returns(true);
    
    onstub = sinon.stub();
    serverret = {on: onstub};
    onstub.returns(serverret);
    serverstub.listen.returns(serverret);

    callbackspy = sinon.spy();

    // hot mock injection
    serve.__set__('server', serverstub);
    serve.__set__('project.cd', cdspy);
};

/* teardown spies/stubs/mocks */
function afterEach() {
    cdspy.reset();
    callbackspy.reset();
    serve.__get__('server.listen').reset();
    serve.__get__('project.cd').reset();
};

/* fixtures */
var valid_options = {port: 3000, autoreload: true, localtunnel: false};


/* TESTS */
beforeEach();
test("Serve Module", function (t) {
    t.plan(5);

    /* trivial state test */
    t.type(serve, 'function', "should export a function");

    /* invoking with valid arguments */
    beforeEach();
    t.test("when invoking serve with a valid argument list", function (t) {
        var datastub = {};

        t.plan(8);
        
        // given        
        serve(valid_options, callbackspy);
        onstub.args[2][1](datastub); // 'emit' the complete event
        // then
        t.ok(cdspy.calledOnce, "should attempt to change the working directory to the project directory");
        t.equal(serverstub.listen.callCount, 1, "should call the server module once");
        t.type(serverstub.listen.args[0][0], 'object', "should invoke the server module with options");
        t.equal(onstub.callCount, 3, "should register event listeners for server events");
        t.ok(callbackspy.calledOnce, "should call the callback passed in as a parameter");
        t.equal(callbackspy.args[0].length, 2, "should call the callback with 2 arguments");
        t.equal(callbackspy.args[0][0], null, "should call the callback with error === null");
        t.equal(callbackspy.args[0][1], datastub, "should call the callback with data === datastub");



        afterEach();    
    });

    /* cd fail case  */
    beforeEach();
    t.test("when invoking serve with failing project.cd attempt", function (t) {
        t.plan(3);
        
        // given
        cdspy.returns(false);
        serve(valid_options, callbackspy);
        
        // then
        t.equal(cdspy.callCount, 1, "should attempt to call the project.cd utility function");
        t.ok(callbackspy.calledOnce, "should execute the callback passed in as a parameter");
        t.type(callbackspy.args[0][0], 'Error', "should pass an error back with the callback");

        afterEach();
    });

    beforeEach()
    t.test("when executed, should register event handlers", function (t) {
        beforeEach();
        t.plan(8);

        // given
        serve(valid_options, callbackspy);

        //then
        t.equal(onstub.callCount, 3, "should register 3 handers");
        t.ok(onstub.calledWithMatch('error'), "should register an 'error' event handler on the return object form Server.listen");
        t.type(onstub.args[0][1], 'function', "should provide a handler function");
        t.equal(onstub.args[0][1], serve.__get__('_errorHandler'), "should register the utility error handler");
        t.ok(onstub.calledWithMatch('log'), "should register an 'log' event handler on the return object form Server.listen");
        t.type(onstub.args[1][1], 'function', "should provide a handler function");
        t.ok(onstub.calledWithMatch('complete'), "should register an 'complete' event handler on the return object form Server.listen");
        t.type(onstub.args[2][1], 'function', "should provide a handler function");
        afterEach();
    });

    /* on 'error' */
    beforeEach();
    t.test("", function (t) {
        t.plan(1);
        t.ok(true, "true");
        afterEach();
    });
});
