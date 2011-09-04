var messages = [];

function messageMaker(attrs) {
  attrs = attrs || {};
  attrs.user_id = 0;
  return attrs;
};

function allMessages(callback) {
  process.nextTick(function () {
    callback(null, messages);
  });
}

function addMessage(msg, callback) {
  var newMessage = messageMaker(msg);
  messages.push(newMessage);
  var messageId = messages.length - 1;

  process.nextTick(function () {
    callback(null, messageId)
  });
}

function getMessageById(id, callback) {
  var message = messages[id];

  process.nextTick(function () {
    callback(null, message);
  });
}

exports.messageMaker = messageMaker;
exports.allMessages = allMessages;
exports.addMessage = addMessage;
exports.getMessageById = getMessageById;
