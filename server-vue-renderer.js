
var fs = require('fs');
var vueServerRenderer = require('vue-server-renderer');

module.exports = createVueRenderer;

function createVueRenderer(createApp) {
  var renderer = require('vue-server-renderer').createRenderer({
    // template: fs.readFileSync(__dirname+'/server-vue-renderer.html').toString()
  });

  return middleware;

  function middleware(req, res, next) {
    if(req.url !== '/') {
      return next();
    }

    var ctx = {
      id: 'app',
      url: req.url,
      title: 'Hello App',
    };

    var app = createApp(ctx);
    // console.log(app);

    renderer.renderToString(app, ctx)
      .then(function(html){
        res.render('index.html.twig', {
          html: html,
        });
        // res.send(html);
      })
      .catch(function(err){
        console.error(err.stack||err);
        res.status(500).end('Internal Server Error');
      })
    ;
  }
}
