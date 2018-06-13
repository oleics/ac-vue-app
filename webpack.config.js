
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var BabelPresetEnv = require('babel-preset-env');
var BabelPresetStage3 = require('babel-preset-stage-3');
var BabelPluginTransformVueJsxPlugin = require('babel-plugin-transform-vue-jsx');
var BabelPluginTransformInlineEnvVarsPlugin = require('babel-plugin-transform-inline-environment-variables');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var argv = require('minimist')(require('minimist')(process.argv.slice(2))._);
var cwd = argv.cwd || process.env.PWD || process.cwd();

module.exports = createConfig;

function createConfig(pkg, target, filepath, source, optimizeSSR) {

  target = target || 'web';
  optimizeSSR = optimizeSSR == null ? true : !!optimizeSSR;

  var appSource = path.join(cwd, 'src/app.vue');

  console.log('webpack config');
  console.log('%s', source);
  console.log('  __app__ %s', appSource);
  console.log('    > %s %s', target, filepath);
  // console.log(process.argv);

  var babelPresets = [
    [
      BabelPresetEnv,
      {
        'modules': false,
        // 'targets': {
        //   'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8']
        // }
      }
    ],
    BabelPresetStage3
  ];

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
        'ac-sr': path.join(__dirname, 'src/safe-require.js'),
        '__app__': appSource,
        'vue': path.join(__dirname+'/node_modules/vue/dist/vue.runtime.esm.js'),
      }
    },

    externals: getExternals(target),

    module: {
      rules: [
        {
          test: /\.js$/,
          // exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: babelPresets,
              plugins: [
                BabelPluginTransformVueJsxPlugin,
                BabelPluginTransformInlineEnvVarsPlugin,
              ]
            }
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            optimizeSSR: optimizeSSR,
            // loaders: {
            //   js: {
            //     loader: 'babel-loader',
            //     options: {
            //       presets: babelPresets
            //     }
            //   }
            // }
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

    plugins.push(new webpack.DefinePlugin({
      '__pkg_name__': JSON.stringify(pkg.name),
      '__pkg_version__': JSON.stringify(pkg.version),
    }));

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
