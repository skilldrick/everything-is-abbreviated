var messages = [];

function messageMaker(attrs) {
  attrs = attrs || {};
  attrs.id = attrs.id || 0;
  attrs.user_id = 0;
  return attrs;
};

function allMessages() {
  return messages;
}

function addMessage(msg) {
  messages.push(messageMaker(msg));
}

function getMessageById(id) {
  return messages.filter(function (msg) {
    return msg.id === id;
  })[0];
}

exports.messageMaker = messageMaker;
exports.allMessages = allMessages;
exports.addMessage = addMessage;
exports.getMessageById = getMessageById;
