var vows = require('vows');
var assert = require('assert');

var Message = require('message');

vows.describe('Message').addBatch({
  'A message': {
    topic: new Message,
    'should exist': function (message) {
      assert.isObject(message);
    },
    'should have an id': function (message) {
      assert.isNumber(message.id);
    },
    'should have a user': function (message) {
      assert.isNumber(message.user_id);
    }
  }
}).export(module);
