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
        topic: pact.request(),
        'should succeed': pact.code(200)
      }
    }
  }
}).export(module);
