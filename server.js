
var fs = require('fs');
var http = require('http');
var express = require('express');
var createServiceProxy = require('./server-service-proxy');
var createRelay = require('./server-relay');
var createVueRenderer = require('./server-vue-renderer');

var shared = require('./shared');
var argv = shared.argv;
var cwd = shared.cwd;

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
  .then(createAndRunApp)
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

function createAndRunApp(ctx) {
  var app = express();
  app.enable('strict routing');
  app.disable('x-powered-by');

  app.set('view engine', 'twig');
  app.set('views', __dirname+'/src/app/templates/browser');

  // reverse proxy services
  var serviceProxyPath = '/_service';
  var serviceProxy = createServiceProxy(app, serviceProxyPath, getMainServerUrl(ctx));
  app.get(serviceProxyPath, function(req, res, next){
    var hostUrl = req.protocol+'://'+req.headers.host;
    var defaultServices = {};
    defaultServices[ctx.lpkg.name] = {
      url: hostUrl+serviceProxyPath,
      home: hostUrl,
    };
    console.log(req.protocol);
    res.json({
      env: process.env.NODE_ENV || 'development',
      app: {
        name: ctx.pkg.name,
        version: ctx.pkg.version,
        url: hostUrl+''+(ctx.pkg.name !== ctx.lpkg.name ? '/'+ctx.pkg.name : ''),
      },
      services: Object.assign({
        defaults: defaultServices,
      }, serviceProxy.getServices(serviceProxyPath, hostUrl)),
    });
  });

  // reverse proxy anything
  createRelay(app);

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
