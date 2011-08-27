var APP = {};

APP.Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function () {
    var messages = new APP.Messages;
    var messagesView = new APP.MessagesView({
      collection: messages,
      el: '#main'
    });
    messages.fetch();
  }
});
