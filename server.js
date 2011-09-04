var http = require('http');
var nodeStatic = require('node-static');
var journey = require('journey');

var fileServer = new nodeStatic.Server('./public');
var router = new journey.Router;
var message = require('message');

router.get('/api').bind(function (req, res) {
  res.send(200);
});

router.get('/api/messages').bind(function (req, res) {
  message.allMessages(function (err, messages) {
    res.send(200, {}, messages);
  });
});

router.post('/api/messages').bind(function (req, res, data) {
  message.addMessage(data, function (err, id) {
    res.send(200, {}, id);
  });
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
