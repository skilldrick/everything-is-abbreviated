require('./spec_helper');
var vows = require('vows');
var assert = require('assert');
var pact = require('pact');
var should = require('should');
var sinon = require('sinon');
var server = require('server');
var message = require('message');


var stubMessagesFunc = function (callback) {
  var messages = [
    { message: 'Hellllooooo!!!' },
    { message: 'Wow, this is great.' },
    { message: 'Yeah, really great.' }
  ];
  process.nextTick(function () {
    callback(null, messages);
  });
};

var stubAddMessageFunc = function (msg, callback) {
  process.nextTick(function () {
    callback(null, 42);
  });
};

vows.describe('Server').addBatch({
  'A server': {
    topic: pact.httpify(server),
    'with static files:': {
      'when /index.html is requested': {
        topic: pact.request(),
        'should respond with success': pact.code(200)
      },
      'when /blahblahblah is requested': {
        topic: pact.request(),
        'should respond with failure': pact.code(404)
      }
    },
    'with stubbed allMessages': {
      topic: function () {
        return sinon.stub(message, 'allMessages', stubMessagesFunc);
      },
      teardown: function () {
        message.allMessages.restore();
      },
      'when /api is requested': {
        topic: pact.request(),
        'should respond with success': pact.code(200)
      },
      'when /api/messages is requested': {
        topic: pact.request(),
        'should respond with success': pact.code(200),
        'should respond with an array of messages': function (res) {
          res.body.should.have.length(3);
          res.body[0].should.have.property('message');
        }
      }
    },
    'with stubbed addMessage': {
      topic: function () {
        return sinon.stub(message, 'addMessage', stubAddMessageFunc);
      },
      teardown: function () {
        message.addMessage.restore();
      },
      'when /api/messages is posted to': {
        topic: pact.request({
          url: '/api/messages',
          method: 'POST',
          data: { message: 'This is a new message' }
        }),
        'a new message should be added': function () {
          message.addMessage.called.should.be.true;
        },
        'should respond with success': pact.code(200),
        'should respond with the new message id': function (res) {
          res.body.should.equal(42);
        }
      }
    }
  }
}).export(module);
