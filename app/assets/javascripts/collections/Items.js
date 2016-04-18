var app = app || {};

app.Items = Backbone.Collection.extend({
  url: function () {
    '/storeitems/' + app.store.id
  },
  model: app.Item
});
