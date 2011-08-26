var http = require('http');
var url = require('url');
var nodeStatic = require('node-static');

var fileServer = new nodeStatic.Server('./public');

module.exports = http.createServer(function (req, res) {
  if (url.parse(req.url).pathname == '/api') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  } else {
    req.addListener('end', function () {
      fileServer.serve(req, res);
    });
  }
});

