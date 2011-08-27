var http = require('http');
var nodeStatic = require('node-static');

var fileServer = new nodeStatic.Server('./public');

module.exports = http.createServer(function (req, res) {
  req.addListener('end', function () {
    fileServer.serve(req, res);
  });
});
