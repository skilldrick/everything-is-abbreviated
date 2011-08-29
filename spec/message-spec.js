var vows = require('vows');
var assert = require('assert');

var messageMaker = require('message').messageMaker;
var allMessages = require('message').allMessages;

vows.describe('Message').addBatch({
  'A message': {
    topic: function () { return messageMaker(); },
    'should exist': function (message) {
      assert.isObject(message);
    },
    'should have an id': function (message) {
      assert.isNumber(message.id);
    },
    'should have a user': function (message) {
      assert.isNumber(message.user_id);
    }
  },
  'Messages': {
    topic: function () { return allMessages(); },
    'all messages should be an array': function (all) {
      assert.isArray(all);
    }
  }
}).export(module);
