/*
 * Module dependencies.
 */

var PhoneGap = require('../../lib/phonegap'),
    Create = require('../../lib/phonegap/create'),
    cordova = require('cordova-lib').cordova,
    shell = require('shelljs'),
    phonegap,
    options;

/*
 * Specification: phonegap.create(options, [callback])
 */

describe('PhoneGap create child script', function() {
    beforeEach(function() {
        options = {
            path: '/some/path/to/app/www'
        };

        process.send = jasmine.createSpy();
//        spyOn(phonegap, 'version').andReturn({ phonegap: '2.8.0' });
        spyOn(cordova, 'create');
        spyOn(cordova, 'config');
//        spyOn(shell, 'rm');
//        spyOn(shell, 'cp');

        spyOn(process.stderr, 'write');
    });

    it('should require options', function() {
        expect(function() {
            Create();
        }).toThrow();
    });

    it('should require options to be defined', function() {
        expect(function() {
            Create(undefined);
        }).toThrow();
    
        expect(function() {
            Create(null);
        }).toThrow();
    });

    it('should require options.path', function() {
        expect(function() {
            options.path = undefined;
            Create(options);
        }).toThrow();
    });

    it('should require accept a numeric path', function() {
        expect(function() {
            options.path = 123;
            Create(options, function(e) {});
        }).not.toThrow();
    });

    it('should not require callback', function() {
        expect(function() {
            Create(options);
        }).not.toThrow();
    });

    it('should return true', function() {
        expect(Create(options)).toEqual(true);
    });

    it('should try to create a project with default values', function() {
        Create(options);
        expect(cordova.create).toHaveBeenCalledWith(
            options.path,
            'com.phonegap.helloworld',
            'HelloWorld',
            jasmine.any(Function)
        );
    });

    it('should try to create a project with custom values', function() {
        options.id = 'com.example.app';
        options.name = 'My App';
        phonegap.create(options);
        expect(cordova.create).toHaveBeenCalledWith(
            options.path,
            options.id,
            options.name,
            jasmine.any(Function)
        );
    });
/*
    describe('successfully created a project', function() {
        beforeEach(function() {
            cordova.create.andCallFake(function(path, id, name, callback) {
                callback(null);
            });
        });

        it('should trigger called without an error', function(done) {
            phonegap.create(options, function(e) {
                expect(e).toBeNull();
                done();
            });
        });
    });

    describe('failed to create a project', function() {
        beforeEach(function() {
            cordova.create.andCallFake(function(path, id, name, callback) {
                callback(new Error('path already exists'));
            });
        });

        it('should trigger callback with an error', function(done) {
            phonegap.create(options, function(e) {
                expect(e).toEqual(jasmine.any(Error));
                done();
            });
        });

        it('should trigger "error" event', function(done) {
            phonegap.on('error', function(e) {
                expect(e).toEqual(jasmine.any(Error));
                done();
            });
            phonegap.create(options);
        });
    });
*/
});
