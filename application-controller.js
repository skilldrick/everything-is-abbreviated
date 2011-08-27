var url = require('url');
var MessagesController = require('messages-controller');

module.exports = function (req, res) {
  var parsed = url.parse(req.url, true);
  var pathname = parsed.pathname;
  var pathParts = [];
  var query = parsed.query || [];
  var controller, controllerName, action;

  var controllers = {
    messages: MessagesController
  };

  if (pathname.match(/^\/api\//)) {
    pathParts = pathname.split('/').slice(2);
    controllerName = pathParts[0];
    action = pathParts[1];
    controller = controllers[controllerName];
    controller(req, res, action);
  }
};
