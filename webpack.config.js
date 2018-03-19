
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var BabelPresetEnv = require('babel-preset-env');
var BabelPluginTransformVueJsxPlugin = require('babel-plugin-transform-vue-jsx');

var argv = require('minimist')(require('minimist')(process.argv.slice(2))._);
var cwd = argv.cwd || process.env.PWD || process.cwd();

module.exports = createConfig;

function createConfig(target, filepath, source, optimizeSSR) {

  target = target || 'web';
  optimizeSSR = optimizeSSR == null ? true : !!optimizeSSR;

  var appSource = path.join(cwd, 'src/app.vue');
  console.log('webpack config');
  console.log('%s', source);
  console.log('  __app__ %s', appSource);
  console.log('    > %s %s', target, filepath);
  // console.log(process.argv);

  return {
    mode: process.env.NODE_ENV || 'development',
    stats: 'minimal',

    target: target,
    entry: source,

    output: {
      path: path.dirname(filepath),
      filename: path.basename(filepath),
      libraryTarget: getLibraryTarget(target),
    },

    resolve: {
      // extensions: ['.vue', '.js', '.jsx'],
      modules: [
        'node_modules',
        path.join(cwd, 'node_modules'),
        path.join(__dirname, 'node_modules'),
      ],
      alias: {
        'ac-sr': path.join(__dirname, 'src/save-require.js'),
        '__app__': appSource,
      }
    },

    externals: getExternals(target),

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                BabelPresetEnv
              ],
              plugins: [
                BabelPluginTransformVueJsxPlugin,
              ]
            }
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            optimizeSSR: optimizeSSR
          }
        }
      ]
    },

    plugins: getPlugins(target),

    devtool: 'source-map',
  };

  function getLibraryTarget(target) {
    var libraryTarget;
    if(target === 'node' || target === 'async-node') {
      libraryTarget = 'commonjs2';
    }
    return libraryTarget;
  }

  function getPlugins(target) {
    var plugins = [];
    if(target === 'node') {
      plugins.push(new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }));

      // plugins.push((new webpack.ProvidePlugin({
      //   'navigator': 'navigator'
      // }));
    }
    return plugins;
  }

  function getExternals(target) {
    var externals = [];
    if(target === 'node') {
      externals.push(nodeExternals({
        // load non-javascript files with extensions, presumably via loaders
        whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
      }));
    }
    return externals;
  }
}
