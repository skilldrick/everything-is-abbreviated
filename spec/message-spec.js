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
      'adding a message should increase the number of messages': function (messages) {
        var length = messages.length;
        message.addMessage({message: 'Hello'});
        assert.notEqual(messages.length, length);
      },
      'an added message should exist in messages': function (messages) {
        message.addMessage({message: 'Hi'});
        assert.isTrue(messages.some(function (item) {
          return item.message === 'Hi';
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
