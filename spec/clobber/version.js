/* test dependencies */
var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('rewire');

/* rewire module under test */
var version = rewire('../../lib/clobber/version');

/* define spies/mocks/staging */
var logspy;
var package = {version:"1.3.3.7"}

/* setup spies/stubs/mocks */
function beforeEach() {
    version.__set__('package', package);
    logspy = sinon.spy(console, 'log');
};

/* TESTS */
test("Version Module", function (t) {
    t.plan(2);

    /* trivial state test */
    t.type(version, 'function', "should export a function");
    
    /* */
    beforeEach();
    t.test("when executed", function (t) {
        t.plan(3);
        
        version({}, function (ver) {
            t.equal(ver, package.version, "should return the version string found in package.json");
            t.ok(logspy.called, "should output a log");
            t.equal(logspy.args[0][0], ver, "should only log the package version"); 
        });
    });

});
