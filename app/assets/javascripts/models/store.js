var app = app || {};

app.Store = Backbone.Model.extend({
  defaults: {
    email: "yep@ivegot.email",
    address: "1 The Street, Heresville",
    name: "Storey McStoreface"
  },
  urlRoot: "/stores"
});
