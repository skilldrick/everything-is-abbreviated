var APP = {};

APP.Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function () {
    console.log('index');
    var messages = new APP.Messages;
    var messagesView = new APP.MessagesView({
      collection: messages,
      el: '#main'
    });
    messages.fetch();
  }
});
