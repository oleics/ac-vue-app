
var fs = require('fs');
var http = require('http');
var express = require('express');
var createServiceProxy = require('./server-service-proxy');
var createVueRenderer = require('./server-vue-renderer');

var argv = require('minimist')(process.argv.slice(2));

var cwd = argv.cwd || process.env.PWD || process.cwd();
var lpkg = require(__dirname+'/package.json');
var pkg = require(cwd+'/package.json');

console.log('SERVER');

Promise.resolve({
  port: process.env.PORT || 3000,
  cwd: cwd,
  lpkg: lpkg,
  pkg: pkg,
})
  .then(runMainOrLeafServer)
  .then(runApp)
  .then(function(ctx){
    console.log('OK up and running');
  })
  .catch(function(err){
    console.error(err.stack||err);
    process.exit(1);
  })
;

function runMainOrLeafServer(ctx) {
  return new Promise(function(resolve, reject) {
    var server = http.createServer();
    server.once('error', onceError);
    server.once('listening', onceListening);

    server.listen(ctx.port);

    function onceListening() {
      server.removeListener('error', onceError);
      var url = getServerUrl(server);
      console.log('Listening: %s (main)', url);
      ctx.server = server;
      resolve(ctx);
    }

    function onceError(err) {
      server.removeListener('listening', onceListening);
      if(err.code !== 'EADDRINUSE') {
        return reject(err);
      }
      resolve(runLeafServer(ctx));
    }
  });
}

function runLeafServer(ctx) {
  return new Promise(function(resolve, reject) {
    var server = http.createServer();
    server.once('listening', onceListening);
    server.once('error', onceError);
    server.listen();
    function onceListening() {
      server.removeListener('error', onceError);
      var url = getServerUrl(server);
      console.log('Listening: %s (leaf)', url);
      ctx.server = server;
      resolve(ctx);
    }
    function onceError(err) {
      server.removeListener('listening', onceListening);
      if(err.code !== 'EADDRINUSE') {
        return reject(err);
      }
      resolve(runLeafServer(ctx));
    }
  });
}

function getMainServerUrl(ctx) {
  var url = 'http://localhost:'+ctx.port;
  return url;
}

function getServerUrl(server) {
  var address = server.address();
  var url = 'http://localhost:'+address.port;
  return url;
}

//

function runApp(ctx) {
  var app = express();
  app.enable('strict routing');
  app.disable('x-powered-by');

  // reverse proxy services
  var serviceProxyPath = '/_service';
  var serviceProxy = createServiceProxy(app, serviceProxyPath, getMainServerUrl(ctx));
  app.get(serviceProxyPath, function(req, res, next){
    var defaultServices = {};
    defaultServices[ctx.lpkg.name] = 'http://'+req.headers.host+serviceProxyPath;
    res.json({
      env: process.env.NODE_ENV || 'development',
      app: {
        name: ctx.pkg.name,
        version: ctx.pkg.version,
        url: 'http://'+req.headers.host+''+(ctx.pkg.name !== ctx.lpkg.name ? '/'+ctx.pkg.name : ''),
      },
      services: Object.assign({
        defaults: defaultServices,
      }, serviceProxy.getServices(serviceProxyPath)),
    });
  });

  app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
  });

  // console.log(require(ctx.cwd+'/lib/app'));
  if(argv.ssr || process.env.ENABLE_SSR) {
    console.log('Using server-side-renderer (SSR)');
    app.use(createVueRenderer(require(ctx.cwd+'/build/server/app')));
  }

  app.use(express.static(ctx.cwd+'/build/browser'));

  ctx.server.on('request', app);

  // register this app with main-app-server
  if(ctx.pkg.name !== ctx.lpkg.name) {
    serviceProxy.register(ctx.pkg.name, getServerUrl(ctx.server));
  }

  ctx.app = app;
  ctx.serviceProxy = serviceProxy;
  return ctx;
}
