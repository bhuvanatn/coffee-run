var app = app || {};

app.LineItems = Backbone.Collection.extend({
  url: '/line_items',
  model: app.LineItem
});
