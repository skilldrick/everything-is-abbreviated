var url = require('url');

module.exports = function (req, res) {
  var parsed = url.parse(req.url, true);
  var pathname = parsed.pathname;
  var pathParts = [];
  var query = parsed.query || [];

  if (pathname.match(/^\/api\//)) {
    pathParts = pathname.split('/').slice(2);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify([pathParts, query]));
    res.end('\n');
  }
};
