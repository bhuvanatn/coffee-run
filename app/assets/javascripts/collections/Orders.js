var app = app || {};

app.Orders = Backbone.Collection.extend({
  url: '/orders',
  model: app.Order
});
