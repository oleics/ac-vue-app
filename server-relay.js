
var url = require('url');
var httpProxy = require('http-proxy');

module.exports = createRelay;

function createRelay(app) {
  if(process.env.NODE_ENV === 'production') {
    // TODO: Implement server-relays for production mode
    console.error('ERROR: Refusing to enable server-relay for production-environments');
    process.exit(1);
  }

  var prefix = '/_relay';
  var proxy = httpProxy.createProxyServer({
    secure: false
  });

  app.use(prefix+'/:target*?', middleware);

  function middleware(req, res, next) {
    var target = req.params.target;
    var targetHost = url.parse(target).host;
    if(targetHost) {
      req.headers.host = targetHost;
    }
    console.log('relay:', target);
    proxy.web(req, res, { target: target });
    // next();
  }
}
