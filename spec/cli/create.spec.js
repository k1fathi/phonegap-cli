/*
 * Module dependencies.
 */

var phonegap = require('../../lib/main'),
    path = require('path'),
    CLI = require('../../lib/cli'),
    child_process = require('child_process'),
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
    var cli;
    var cb;

    beforeEach(function() {
        cli = new CLI();
        cb = jasmine.createSpy();
        baseargv = ['node', '/usr/local/bin/phonegap'];
        child = createSpyObj('child', ['on','send']);
        fork = spyOn(child_process,'fork').andReturn(child); 

    });

    /**
     *
     */
    describe('$ phonegap create ./my-app com.example.app', function() {
        var argv;
        beforeEach(function() {
            subcommands = ['create', './my-app', 'com.example.app'];
            argv = baseargv.concat(subcommands);
        });
 
        it('should attempt to spawn a child by forking the process', function() {
            cli.create(argv, cb);
            expect(fork).toHaveBeenCalled();
        });
  
        it('should attempt to spawn child process with unmodified command line arguments ', function() {
            cli.create(argv, cb);
            expect(fork.mostRecentCall.args[1]).toEqual(argv);
        });
    });

    /**
     *
     */
    describe('$ phonegap create <path>', function() {
        var argv;
        beforeEach(function() {
            subcommands = ['create', './my-app', 'com.example.app'];
            argv = baseargv.concat(subcommands);
        });
 
        it('should attempt to spawn a child by forking the process', function() {
            cli.create(argv, cb);
            expect(fork).toHaveBeenCalled();
        });
  
        it('should attempt to spawn child process with unmodified command line arguments ', function() {
            cli.create(argv, cb);
            expect(fork.mostRecentCall.args[1]).toEqual(argv);
        });
        
        it('should send once', function() {
            cli.create(argv, cb);
            expect(child.send).toHaveBeenCalled();
            expect(child.send.callCount).toBe(1);
        });

        it('should send raw arguments', function() {
            cli.create(argv, cb);
            expect(child.send).toHaveBeenCalledWith(argv);
        });
        
        it('should call the correct component script with unmodified command arguments and a callback function if provided', function() {
            cli.create(argv, cb);
            expect(child.on).toHaveBeenCalled();
            expect(child.on.callCount).toBe(2);
        });

        it('should register a message event listener with a callback function on the child', function() {
            cli.create(argv, cb);
            expect(child.on).toHaveBeenCalledWith('message',jasmine.any(Function));
        });

        it('should register an exit event listener with a callback function on the child', function() {
            cli.create(argv, cb);
            expect(child.on).toHaveBeenCalledWith('exit',jasmine.any(Function));
        });
    });
});
