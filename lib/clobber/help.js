/*!
 * Module dependencies.
 */
var path = require('path');
var fs = require('fs');

/**
 * help 
 *   handle requests for help strings 
 * Options:
 *
 * @param {object} args
 * @param {function} callback(err)
 * @return
 */
function Help (data, callback) {
    var basepath = path.join(__dirname, '..', '..', 'doc', 'cli');
    var filepath;
    var data;

    if (data[0] !== 'help') {
        data.unshift('help');
    }

    filepath = data.slice(0);
    filepath.push('txt');
    filepath = filepath.join('.');
    filepath = path.join(basepath, filepath);

    fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        }
        console.log('\n' + data + '\n');
        callback(null);
    });
};

/* Module Exports */
module.exports = Help;
