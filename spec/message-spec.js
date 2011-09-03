require('../spec_helper');
var vows = require('vows');
var assert = require('assert');
var should = require('should');

var message = require('message');

vows.describe('Message').addBatch({
  'A message': {
    topic: function () { return message.messageMaker(); },
    'should exist': function (message) {
      should.exist(message);
    },
    'should have an id': function (message) {
      message.id.should.be.a('number');
    },
    'should have a user': function (message) {
      message.user_id.should.be.a('number');
    }
  },
  'Messages': {
    topic: function () { return message.allMessages(); },
    'all messages should be an array': function (all) {
      all.should.be.instanceof(Array);
    },
    'Add message': {
      topic: function (messages) {
        this.count = messages.length;
        this.messages = messages;
        message.addMessage({message: 'Hello', id: 5}, this.callback);
      },
      'message count should increase': function () {
        this.count.should.not.equal(this.messages.length);
      },
      'an added message should exist in messages': function () {
        var messageExists = this.messages.some(function (item) {
          return item.message === 'Hello';
        });
        messageExists.should.be.true;
      },
      'Get message by id': {
        topic: function () {
          message.getMessageById(5, this.callback);
        },
        'should match the message': function (err, msg) {
          msg.message.should.equal('Hello');
        }
      }
    }
  }
}).export(module);
