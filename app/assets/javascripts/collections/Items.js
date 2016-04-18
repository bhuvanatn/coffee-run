var app = app || {};

app.Items = Backbone.Collection.extend({
  url: function () {
    var url = '/storeitems/' + app.store.id;
    return url;
  },
  model: app.Item
});
