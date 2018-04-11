
var argv = require('minimist')(require('minimist')(process.argv.slice(2))._);
var cwd = argv.cwd || process.env.PWD || process.cwd();

module.exports = {
  cwd: cwd,
  argv: argv,
};
