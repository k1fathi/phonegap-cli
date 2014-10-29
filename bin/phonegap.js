#!/usr/bin/env node

/*!
 * Module dependencies.
 */

var PG_CLI = require('../lib/phonegapcli');

/*!
 * Run the command-line client.
 */

var cli = new PG_CLI().argv(process.argv, function(e) {
    // if we receive an error, then exit with an error status
    // if an exit code was attached to the error, then use it
    // otherwise default to 1.
    if (e) {
        process.exit(e.exitCode || 1);
    }
});
