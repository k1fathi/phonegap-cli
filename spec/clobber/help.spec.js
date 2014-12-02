var rewire = require('rewire');
var fs = require('fs');


var help = rewire('../../lib/clobber/help.js');


describe("PhoneGap Help", function () {
    var args = ["help","build"];
    var callback = jasmine.createSpy('callback');


    beforeEach(function() {
        spyOn(fs, 'readFile');
    });


    it("should export a function", function () {
        expect(help).toEqual(jasmine.any(Function));
    });


    it("should attempt to read a file", function () {
        help(args, callback);
        expect(fs.readFile).toHaveBeenCalled();
    }); 


    it("should attempt to read a file", function () {
        help(args, callback);
        expect(fs.readFile).toHaveBeenCalled();
    }); 


    describe("sanitizeArgs helper function", function () {
        var sanitizeArgs;
        var flag = 'foo';


        beforeEach(function() {
            sanitizeArgs = help.__get__('sanitizeArgs');
        });


        it("should be a function", function () {
            expect(sanitizeArgs).toEqual(jasmine.any(Function));
        });


        it("should return array with all but first instance of the input flag from an array", function () {
            var result = sanitizeArgs([flag, flag, flag], flag);

            expect(result).toEqual([flag]);
        });


        it("should return input array unmodified if flag not present after first element", function () {
            var args = [flag, 'not', 'so', 'much'];
            var result = sanitizeArgs(args, flag);

            expect(result).toEqual(args);
        });


        it("should return input array unmodified if flag not present after first element", function () {
            var args = [flag, 'not', 'so', 'much'];
            var result = sanitizeArgs(args, flag);

            expect(result).toEqual(args);
        });

    });

});
