var app = app || {};

app.LineItems = Backbone.Collection.extend({
  url: function () {
    return '/orderitems/' + app.order.id;
  },
  model: app.LineItem
});
