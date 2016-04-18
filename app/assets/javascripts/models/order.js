var app = app || {};

app.Order = Backbone.Model.extend({
  defaults: {
    email: "yep@ivegot.email",
    address: "1 The Street, Heresville",
    name: "Runner McRunnerface"
  }
  urlRoot: "/runners",
});
