/*
 * Module dependencies.
 */

var phonegap = require('../../lib/main'),
    CLI = require('../../lib/cli'),
    argv,
    cli,
    stdout,
    fork;

/*
 * Specification: $ phonegap help create
 */
/*
describe('phonegap help create', function() {
    var subcommands;

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
            expect(stdout.mostRecentCall);
console.log('==================================================');
        console.log(stdout.mostRecentCall.args);
console.log(stdout.mostRecentCall.args);
//            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ create/i);
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

describe('phonegap create <path>', function() {
    var cli,
        argv;
        

    beforeEach(function() {
        cli = new CLI();
        argv = ['node', '/usr/local/bin/phonegap'];
//        spyOn(process.stdout, 'write');
        spyOn(cli, 'create');
    });

    /**
     *
     */
    describe('$ phonegap create ./my-app com.example.app', function() {
        beforeEach(function() {
            subcommands = ['create', './my-app', 'com.example.app'];
            argv = argv.concat(subcommands);
        });
 
        it('should call the correct component script with unmodified command arguments', function() {
            cli.argv(argv.concat(subcommands));
            expect(cli.create).toHaveBeenCalled();
            expect(cli.create).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Function));
            expect(cli.create.argsForCall[0][0]).toEqual(argv.concat(subcommands));
        });
        
        it('should call the correct component script with unmodified command arguments and a callback function if provided', function() {
            var cb = function () {};
            cli.argv(argv, cb);
            expect(cli.create).toHaveBeenCalledWith(jasmine.any(Object), cb);
        });
    });


    /**
     *
     */
    describe('$ phonegap create ./my-app com.example.app "My App"', function() {
        var cb;
        beforeEach(function() {
            subcommands = ['create', './my-app', 'com.example.app', 'My App'];
            cb = function () {};
        });
        
        it('should call the correct component script', function() {
            cli.argv(argv.concat(subcommands));
            expect(cli.create).toHaveBeenCalled();
        });

       it('should call the correct component script', function() {
            cli.argv(argv.concat(subcommands));
            expect(cli.create).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Function));
            expect(cli.create.argsForCall[0][0]).toEqual(argv.concat(subcommands));
        });

       it('should call the correct component script', function() {
            cli.argv(argv.concat(subcommands),cb);
            expect(cli.create).toHaveBeenCalledWith(jasmine.any(Object), cb);
        });

    });

    describe('$ phonegap create ./my-app --id com.example.app', function() {
        beforeEach(function() {
            subcommands = ['create', './my-app', '--id', 'com.example.app'];
        });
        it('should try to create the project', function() {
            cli.argv(argv.concat(subcommands));
            expect(cli.create).toHaveBeenCalledWith(jasmine.any(Object),jasmine.any(Function));
        });
    });


/*
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
*/
    /**
     *
     */
    describe('$ phonegap create ./my-app -i com.example.app -n "My App"', function() {
        beforeEach(function() {
            subcommands = [
                'create', './my-app',
                '-i', 'com.example.app',
                '-n', 'My App'];
        });

        it('should try to create the project', function() {
            cli.argv(argv.concat(subcommands));
            expect(cli.create).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Function));
        });
    });
});
