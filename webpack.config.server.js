
var createWebpackConfig = require('./webpack.config');
var path = require('path');

var argv = require('minimist')(require('minimist')(process.argv.slice(2))._);
var cwd = argv.cwd || process.env.PWD || process.cwd();

var source = './src/app/app.js';
var output = path.join(cwd, 'build', 'server', 'app.js');

module.exports = createWebpackConfig('async-node', output, source);
