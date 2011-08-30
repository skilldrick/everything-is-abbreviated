require('../spec_helper');
var vows = require('vows');
var assert = require('assert');

var message = require('message');

vows.describe('Message').addBatch({
  'A message': {
    topic: function () { return message.messageMaker(); },
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
    topic: function () { return message.allMessages(); },
    'all messages should be an array': function (all) {
      assert.isArray(all);
    },
    'Add message': {
      topic: function (messages) {
        this.count = messages.length;
        this.messages = messages;
        message.addMessage({message: 'Hello'}, this.callback);
      },
      'message count should increase': function () {
        assert.notEqual(this.messages.length, this.count);
      },
      'an added message should exist in messages': function () {
        assert.isTrue(this.messages.some(function (item) {
          return item.message === 'Hello';
        }));
      }
    },
    'Get message by id': function (messages) {
      message.addMessage({message: 'Yo!', id: 5});
      var m = message.getMessageById(5);
      assert.equal('Yo!', m.message);
    }
  }
}).export(module);
