var app = app || {};

app.Customers = Backbone.Collection.extend({
  url: '/customers',
  model: app.Customer
});
