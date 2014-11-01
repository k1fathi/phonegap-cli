/*!
 * Module dependencies.
 */

var phonegap = require('./main'),
    console = require('./cli/util/console');

/**
 * Command line interface object.
 */

function PhoneGapCLI() {
    // This can be prevented by using dependency injection
    this.cli = this;
    this.local.cli = this;
    this.local.plugin.cli = this;
    this.platform.cli = this;
    this.plugin.cli = this;
    this.remote.cli = this;
}

/**
 * Command line commands.
 */

PhoneGapCLI.prototype.argv = require('./cli/argv');
PhoneGapCLI.prototype.build = require('./cli/build');
PhoneGapCLI.prototype.create = require('./cli/create');
PhoneGapCLI.prototype.help = require('./cli/help');
PhoneGapCLI.prototype.install = require('./cli/install');
PhoneGapCLI.prototype.local = require('./cli/local');
PhoneGapCLI.prototype.local.build = require('./cli/local.build');
PhoneGapCLI.prototype.local.install = require('./cli/local.install');
PhoneGapCLI.prototype.local.plugin = require('./cli/local.plugin');
PhoneGapCLI.prototype.local.plugin.add = require('./cli/local.plugin.add');
PhoneGapCLI.prototype.local.plugin.list = require('./cli/local.plugin.list');
PhoneGapCLI.prototype.local.plugin.remove = require('./cli/local.plugin.remove');
PhoneGapCLI.prototype.local.run = require('./cli/local.run');
PhoneGapCLI.prototype.platform = require('./cli/platform');
PhoneGapCLI.prototype.platform.update = require('./cli/platform.update');
PhoneGapCLI.prototype.plugin = require('./cli/plugin');
PhoneGapCLI.prototype.plugin.add = require('./cli/plugin.add');
PhoneGapCLI.prototype.plugin.remove = require('./cli/plugin.remove');
PhoneGapCLI.prototype.plugin.list = require('./cli/plugin.list');
PhoneGapCLI.prototype.remote = require('./cli/remote');
PhoneGapCLI.prototype.remote.build = require('./cli/remote.build');
PhoneGapCLI.prototype.remote.install = require('./cli/remote.install');
PhoneGapCLI.prototype.remote.login = require('./cli/remote.login');
PhoneGapCLI.prototype.remote.logout = require('./cli/remote.logout');
PhoneGapCLI.prototype.remote.run = require('./cli/remote.run');
PhoneGapCLI.prototype.run = require('./cli/run');
PhoneGapCLI.prototype.serve = require('./cli/serve');
PhoneGapCLI.prototype.app = PhoneGapCLI.prototype.serve;
PhoneGapCLI.prototype.unknown = require('./cli/unknown');
PhoneGapCLI.prototype.version = require('./cli/version');

/*!
 * CLI messages.
 */

phonegap.on('log', function() {
    console.log.apply(this, arguments);
});

phonegap.on('warn', function() {
    console.warn.apply(this, arguments);
});

phonegap.on('error', function(e) {
    console.error.call(this, e.message);
});

phonegap.on('raw', function() {
    console.raw.apply(this, arguments);
});

/*!
 * Expose the CLI object.
 */

module.exports = CLI;
