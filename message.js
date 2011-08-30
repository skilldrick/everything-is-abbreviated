var messages = [];

function messageMaker(attrs) {
  attrs = attrs || {};
  attrs.id = 0;
  attrs.user_id = 0;
  return attrs;
};

function allMessages() {
  return messages;
}

function addMessage(msg) {
  messages.push(messageMaker(msg));
}

exports.messageMaker = messageMaker;
exports.allMessages = allMessages;
exports.addMessage = addMessage;
