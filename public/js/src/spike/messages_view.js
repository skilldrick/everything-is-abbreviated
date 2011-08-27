APP.MessagesView = Backbone.View.extend({
  initialize: function () {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },

  render: function () {
    this.collection.each(function (message) {
      var view = new APP.MessageView({model: message});
      var ul = this.make('ul');
      $(this.el).append(ul);
      $(ul).append(view.render().el);
    }, this);
    return this;
  }
});
