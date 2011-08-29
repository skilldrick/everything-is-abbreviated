require('../spec_helper');
var vows = require('vows');
var assert = require('assert');
var pact = require('pact');
var server = require('server');

vows.describe('Server').addBatch({
  'A server': {
    topic: pact.httpify(server),
    'should serve static files': {
      'when /index.html is requested': {
        topic: pact.request(),
        'should succeed': pact.code(200)
      },
      'when /blahblahblah is requested': {
        topic: pact.request(),
        'should fail': pact.code(404)
      }
    },
    'should respond to /api requests': {
      'when /api is requested': {
        topic: pact.request({
          url: '/api',
          method: 'GET',
        }),
        'should succeed': pact.code(200)
      },
      'when /api/messages is requested': {
        topic: pact.request(),
        'should succeed': pact.code(200),
        'should return an array of messages': function (res) {
          assert.isTrue(res.body.length > 1);
          assert.include(res.body[0], 'message');
        }
      }
    }
  }
}).export(module);
