APP.MessageView = Backbone.View.extend({
  tagName: 'li',

  render: function () {
    $('#tmpl-message-li').tmpl(this.model.toJSON()).appendTo(this.el);
    return this;
  }
});
