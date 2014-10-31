var test = require('tap').test;
var sinon = require('sinon');
var rewire = require('sinon');

var shell = require('shelljs');
var path = require('path');
var bin = 'node ' + path.resolve(path.join(__dirname, '..', 'bin', 'phonegap.js'));

function beforeEach() {
    sinon.spy(process.stdout, 'write');
    sinon.spy(process.stderr, 'write');
};


test('should suppport no arguments', function(t) {
    var process = shell.exec(bin + '', { silent: true });

    t.plan(1);
    t.equal(process.output, 'Usage:', 'should support no arguments');
});

test('should support version command', function(t) {
    var process = shell.exec(bin + '', { silent: true });

    t.plan(1);
    t.equal(process.output, /^\w+\.\w+\.\w+/, 'should support commands');
});

test('should support version as option', function(t) {
    var process = shell.exec(bin + ' --version', { silent: true });

    t.plan(1);
    t.equal(process.output, /^\w+\.\w+\.\w+/, 'should support commands');
});
