/*!
 * Module dependencies.
 */

var PhoneGap = require('../lib/phonegap'),
    fs = require('fs');
    phonegap = new PhoneGap();

/*!
 * Specification: PhoneGap.
 */

describe('phonegap', function() {
    it('should define phonegap.app', function() {
        expect(phonegap.app).toEqual(jasmine.any(Function));
    });

    it('should define phonegap.build', function() {
        expect(phonegap.build).toEqual(jasmine.any(Function));
    });

    /**
     * tests for presence of script in distribution
     */
    it('should include the phonegap create script', function() {
        var createscript; 

        createscript = require('../lib/phonegap/create.js');
        expect(createscript).toBeDefined();
    });

    it('should define phonegap.local', function() {
        expect(phonegap.local).toEqual(jasmine.any(Object));
    });

    it('should define phonegap.local.build', function() {
        expect(phonegap.local.build).toEqual(jasmine.any(Function));
    });

    it('should define phonegap.remote', function() {
        expect(phonegap.remote).toEqual(jasmine.any(Object));
    });

    it('should define phonegap.remote.build', function() {
        expect(phonegap.remote.build).toEqual(jasmine.any(Function));
    });

    it('should define phonegap.remote.login', function() {
        expect(phonegap.remote.login).toEqual(jasmine.any(Function));
    });

    it('should define phonegap.remote.logout', function() {
        expect(phonegap.remote.logout).toEqual(jasmine.any(Function));
    });
});
