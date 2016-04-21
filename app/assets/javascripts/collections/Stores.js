var app = app || {};

app.Stores = Backbone.Collection.extend({
  model: app.Store,
  url: function () {
    if (app.closeStores) {
      console.log("good");
      return '/stores_within';
    } else {
      console.log("bad");
      return '/stores';
    }
  }
});
