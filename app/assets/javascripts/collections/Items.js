var app = app || {};

app.Items = Backbone.Collection.extend({
  url: '/items',
model: app.Item
});
