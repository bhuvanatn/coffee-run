var app = app || {};

app.Stores = Backbone.Collection.extend({
  model: app.Store,
  url: function () {
    if (app.closeStores) {
      return '/stores_within';
    } else {
      return '/stores';
    }
  }
});
