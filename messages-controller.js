function messageFactory(messageId) {
  var messages = [
    'Hello world!',
    'Hi there',
    'Yo dude!!'
  ];
  return {
    id: messageId,
    user_id: 1,
    text: messages[messageId % 3]
  };
}

module.exports = function (req, res, action, id) {
  var actions = {
    index: function () {
      var output = [0,1,2,3,4].map(messageFactory);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(output));
      res.end('\n');
    },
    show: function (id) {
      var output = messageFactory(id);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(output));
      res.end('\n');
    }
  };

  action = action || 'index';
  if (!(action in actions)) {
    //if action is not an action, assume it's an id
    id = +action;
    action = 'show';
  }
  actions[action](id);
};
