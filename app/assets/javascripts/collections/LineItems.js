var app = app || {};

app.LineItems = Backbone.Collection.extend({
  url: '/lineitems',
  model: app.LineItem
});
