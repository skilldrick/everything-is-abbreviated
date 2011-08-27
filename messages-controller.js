module.exports = function (req, res, action) {
  action = action || 'index';

  var actions = {
    index: function () {
      var output = [
        {text: 'Hello world!'},
        {text: 'Hello there!'},
        {text: 'Yo dude!!!'}
      ];
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(output));
      res.end('\n');
    }
  };

  actions[action]();
};
