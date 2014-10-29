#!/usr/bin/env node

/*!
 * Module dependencies.
 */

var PG_CLI = require('../lib/phonegapcli');

/*!
 * Run the command-line client.
 */

var cli = new PG_CLI().argv(process.argv);
