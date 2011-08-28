var http = require('http');
var url = require('url');
var nodeStatic = require('node-static');

var fileServer = new nodeStatic.Server('./public');

module.exports = http.createServer(function (req, res) {
  req.addListener('end', function () {
    fileServer.serve(req, res);
  });

  var path = url.parse(req.url, true).pathname;
  if (path.match(/^\/api/)) {
    res.writeHead(200);
    res.end();
  }
});
