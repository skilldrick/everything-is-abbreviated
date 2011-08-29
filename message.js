var messages = [];

function messageMaker() {
  return {
    id: 0,
    user_id: 0
  };
};

function allMessages() {
  return messages;
}

exports.messageMaker = messageMaker;
exports.allMessages = allMessages;
