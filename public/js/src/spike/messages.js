APP.Messages = Backbone.Collection.extend({
  model: APP.Message,
  url: '/api/messages'
});
