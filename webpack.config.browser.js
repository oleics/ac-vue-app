
var createWebpackConfig = require('./webpack.config');
var path = require('path');

var shared = require('./shared');
var cwd = shared.cwd;

var source = './src/app/app-browser.js';
var output = path.join(cwd, 'build', 'browser', 'app.js');

module.exports = createWebpackConfig(require(cwd+'/package.json'), 'web', output, source);
