/*
 * Module dependencies.
 */

var phonegap = require('../../lib/main'),
    CLI = require('../../lib/cli'),
    argv,
    cli;

/*
 * Specification: $ phonegap version
 */

describe('phonegap --recipe', function() {
    beforeEach(function() {
        cli = new CLI();
        argv = ['node', '/usr/local/bin/phonegap'];
        spyOn(phonegap, 'create');
        spyOn(phonegap, 'recipe');
    });

    describe('$ phonegap create', function() {
        it('should not call recipe if not specified', function() {
            cli.argv(argv.concat(['create', 'example', 'com.example', 'example']));
            expect(phonegap.create).toHaveBeenCalled();
            expect(phonegap.recipe).not.toHaveBeenCalled();
        });

        it('', function() {

        });
    });
});
