var app = app || {};

app.Stores = Backbone.Collection.extend({
  model: app.Store,
  url: "/stores"
});
