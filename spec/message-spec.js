require('../spec_helper');
var vows = require('vows');
var assert = require('assert');
var should = require('should');

var message = require('message');

vows.describe('Message').addBatch({
  'A message produced by messageMaker': {
    topic: function () { return message.messageMaker(); },
    'should exist': function (message) {
      should.exist(message);
    },
    'should have a user': function (message) {
      message.user_id.should.be.a('number');
    }
  },
  'Get all messages': {
    topic: function () {
      message.allMessages(this.callback);
    },
    'All messages should be an array': function (err, all) {
      all.should.be.instanceof(Array);
    },
    'then add message': {
      topic: function (messages) {
        this.count = messages.length;
        this.messages = messages;
        message.addMessage({message: 'Hello'}, this.callback);
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
      'the message id should be returned': function (messageId) {
        messageId.should.equal(0);
      },
      'then add another message': {
        topic: function () {
          message.addMessage({message: 'Hello'}, this.callback);
        },
        'the message id should be greater than before': function (messageId) {
          messageId.should.equal(1);
        }
      },
      'then get message by id': {
        topic: function () {
          message.getMessageById(0, this.callback);
        },
        'should match the message': function (err, msg) {
          msg.message.should.equal('Hello');
        }
      }
    }
  }
}).export(module);
