/*
 * Module dependencies.
 */

var phonegap = require('../../lib/main'),
    CLI = require('../../lib/cli'),
    argv,
    cli,
    stdout;

/*
 * Specification: $ phonegap help create
 */

describe('phonegap help create', function() {
    beforeEach(function() {
        cli = new CLI();
        argv = ['node', '/usr/local/bin/phonegap'];
        spyOn(process.stdout, 'write');
        spyOn(process.stderr, 'write');
        stdout = process.stdout.write;
    });

    describe('$ phonegap help', function() {
        it('should include the command', function() {
            cli.argv(argv.concat(['help']));
            expect(stdout.mostRecentCall.args[0]).toMatch(/\r?\n\s+create <path>.*\r?\n/i);
        });
    });

    describe('$ phonegap create', function() {
        it('should output usage info', function() {
            cli.argv(argv.concat(['create']));
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
        });
    });

    describe('$ phonegap help create', function() {
        it('should output usage info', function() {
            cli.argv(argv.concat(['help', 'create']));
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
        });
    });

    describe('$ phonegap create help', function() {
        it('should output usage info', function() {
            cli.argv(argv.concat(['create', 'help']));
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
        });
    });

    describe('$ phonegap create --help', function() {
        it('should output usage info', function() {
            cli.argv(argv.concat(['create', '--help']));
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
        });
    });

    describe('$ phonegap create -h', function() {
        it('should output usage info', function() {
            cli.argv(argv.concat(['create', '-h']));
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
        });
    });
});

/*
 * Specification: $ phonegap create <path>
 */

describe('phonegap create ', function() {
    var testargs;
    
    beforeEach(function() {
        cli = new CLI();
        argv = ['node', '/usr/local/bin/phonegap'];
        spyOn(process.stdout, 'write');
        spyOn(phonegap, 'create');

        testargs = {
            path: './my-app',
            id: 'com.example.app',
            name: 'My App',
            recipe: false 
        };
    });

    it('should attempt to create the project with specified <path>', function() {
        // setup expected arguments to phonegap.create
        testtargs.id = undefined;    
        testtargs.name = undefined;
 
        cli.argv(argv.concat(['create', testtargs.path]));
        
        expect(phonegap.create).toHaveBeenCalledWith(testtargs, jasmine.any(Function));
    });

    it('should attempt to create the project with specified <path> <id>', function() {
        // setup expected arguments to phonegap.create
        testargs.name = undefined;

        cli.argv(argv.concat(['create', testargs.path, testargs.id]));

        expect(phonegap.create).toHaveBeenCalledWith(testargs, jasmine.any(Function));
    });

    it('should try to create the project with specified <path> <id> <name>', function() {

        cli.argv(argv.concat(['create', testargs.path, testargs.id, testargs.name]));

        expect(phonegap.create).toHaveBeenCalledWith(testargs, jasmine.any(Function));
    });

/*
    describe('$ phonegap create ./my-app --id com.example.app', function() {
        it('should try to create the project', function() {
            cli.argv(argv.concat(['create', './my-app', '--id', 'com.example.app']));
            expect(phonegap.create).toHaveBeenCalledWith({
                path: './my-app',
                id: 'com.example.app',
                name: undefined
            },
            jasmine.any(Function));
        });
    });

    describe('$ phonegap create ./my-app -i com.example.app', function() {
        it('should try to create the project', function() {
            cli.argv(argv.concat(['create', './my-app', '-i', 'com.example.app']));
            expect(phonegap.create).toHaveBeenCalledWith({
                path: './my-app',
                id: 'com.example.app',
                name: undefined
            },
            jasmine.any(Function));
        });
    });

    describe('$ phonegap create ./my-app --name "My App"', function() {
        it('should try to create the project', function() {
            cli.argv(argv.concat(['create', './my-app', '--name', 'My App']));
            expect(phonegap.create).toHaveBeenCalledWith({
                path: './my-app',
                id: undefined,
                name: "My App"
            },
            jasmine.any(Function));
        });
    });

    describe('$ phonegap create ./my-app -n "My App"', function() {
        it('should try to create the project', function() {
            cli.argv(argv.concat(['create', './my-app', '-n', 'My App']));
            expect(phonegap.create).toHaveBeenCalledWith({
                path: './my-app',
                id: undefined,
                name: "My App"
            },
            jasmine.any(Function));
        });
    });

    describe('$ phonegap create ./my-app --id com.example.app --name "My App"', function() {
        it('should try to create the project', function() {
            cli.argv(argv.concat([
                'create', './my-app',
                '--id', 'com.example.app',
                '--name', 'My App'
            ]));
            expect(phonegap.create).toHaveBeenCalledWith({
                path: './my-app',
                id: 'com.example.app',
                name: 'My App'
            },
            jasmine.any(Function));
        });
    });

    describe('$ phonegap create ./my-app -i com.example.app -n "My App"', function() {
        it('should try to create the project', function() {
            cli.argv(argv.concat([
                'create', './my-app',
                '-i', 'com.example.app',
                '-n', 'My App'
            ]));
            expect(phonegap.create).toHaveBeenCalledWith({
                path: './my-app',
                id: 'com.example.app',
                name: 'My App'
            },
            jasmine.any(Function));
        });
    });
*/
});
