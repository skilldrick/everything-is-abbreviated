var http = require('http');
var nodeStatic = require('node-static');
var journey = require('journey');

var fileServer = new nodeStatic.Server('./public');
var router = new journey.Router;

router.get('/api').bind(function (req, res) {
  var data = [
    { message: 'Hellllooooo!!!' },
    { message: 'Wow, this is great.' }
  ];

  res.send(200, {}, data);
});

module.exports = http.createServer(function (req, res) {
  var body = '';

  req.addListener('data', function (chunk) {
    body += chunk;
  });

  req.addListener('end', function () {
    router.handle(req, body, function (route) {
      //if route didn't match, try serving static file
      if (route.status === 404) { 
        fileServer.serve(req, res);
        return;
      }

      res.writeHead(route.status, route.headers);
      res.end(route.body);
    });
  });
});
