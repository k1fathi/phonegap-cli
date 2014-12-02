/*!
 * Module dependencies.
 */
var path = require('path');
var fs = require('fs');

/**
 * strip all instances of 'flag' from array 'args' except the first. Prepends flag to beginning of array.
 * @param args {array}
 * @param args flag element to be removed from fargs
 */
function sanitizeArgs(args, flag) {
    var last = args.lastIndexOf(flag);
 
    if (args[0] !== flag) {
        args.unshift(flag);
    }

    while (last > 0) {
        args = args.splice(last, last+1);
        last = args.lastIndexOf(flag);
    }
    return args;
};

/**
 * constructs path to help file from args
 *
 */
function constructPath(args) {
    var filepath = args.slice(0); 
    var basepath = path.join(__dirname, '..', '..', 'doc', 'cli');

    filepath.push('txt');
    filepath = filepath.join('.');
    filepath = path.join(basepath, filepath);

    return filepath;
}; 

/**
 * help 
 *   handle requests for help strings 
 * Options:
 *
 * @param {object} args
 * @param {function} callback(err)
 * @return
 */
function Help (args, callback) {
    var filepath;
    
    // supports #495, remove any extraneous 'help' flags 
    args = sanitizeArgs(args, 'help');

    //
    filepath = constructPath(args);

    fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        data = data.replace(/\$0/gi, 'phonegap');
        console.log('\n' + data + '\n');
        callback(null);
    });
};

/* Module Exports */
module.exports = Help;
