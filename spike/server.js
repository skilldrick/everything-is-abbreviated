var http = require('http');
var url = require('url');
var nodeStatic = require('node-static');
var AppController = require('application-controller');

var fileServer = new nodeStatic.Server('./public');

module.exports = http.createServer(function (req, res) {
  req.addListener('end', function () {
    fileServer.serve(req, res);
  });

  var controller = AppController(req, res);
});
