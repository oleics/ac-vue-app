
var createWebpackConfig = require('./webpack.config');
var path = require('path');

var shared = require('./shared');
var cwd = shared.cwd;

var source = './src/app/app-package.js';
var output = path.join(cwd, 'build', 'package', 'app.js');

module.exports = createWebpackConfig(require(cwd+'/package.json'), 'async-node', output, source, false);
