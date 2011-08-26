var url = require('url');

module.exports = function (req, res) {
  var pathname = url.parse(req.url).pathname;
  var pathParts = [];
  if (pathname.match(/^\/api\//)) {
    pathParts = pathname.split('/').slice(2);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(pathParts));
    res.end('\n');
  }
};
