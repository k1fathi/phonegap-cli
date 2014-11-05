/* test dependencies */
var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

/* rewire module under test */
var serve = rewire('../lib/cli/serve');

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
    serverstub.listen = sinon.stub().returns(serverret);
    cdspy = sinon.stub().returns(true);
    
    onstub = sinon.stub();
    serverret = {on: onstub};
    onstub.returns(serverret);
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
    t.plan(3);

    /* trivial state test */
    t.type(serve, 'function', "should export a function");

    /* invoking with valid arguments */
    beforeEach();
    t.test("when invoking serve with a valid argument list", function (t) {
        t.plan(5);

        // given        
        serve(valid_options, callbackspy);

        // then
        t.ok(cdspy.calledOnce, "should attempt to change the working directory to the project directory");
        t.equal(serverstub.listen.callCount, 1, "should call the server module once");
        t.type(serverstub.listen.args[0][0], 'object', "should invoke the server module with options");
        t.equal(onstub.callCount, 0, "should register error, log and complete event listeners for server events");
        t.ok(callbackspy.calledOnce, "should call the callback passed in as a parameter");

        afterEach();    
    });

    /* cd fail case  */
    beforeEach();
    t.test("when invoking serve with failing project.cd attempt", function (t) {
        t.plan(2);
        
        // given
        cdspy.returns(false);
        serve(valid_options, callbackspy);
        
        // then
        t.equal(cdspy.callCount, 1, "should attempt to call the project.cd utility function");
        t.ok(callbackspy.calledOnce, "should execute the callback passed in as a parameter");
///        t.equal(callbackspy.args[0][

        afterEach();
    });
    afterEach();
});
