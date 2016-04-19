var app = app || {};

app.User = Backbone.Model.extend({
  defaults: {
    email: "yep@ivegot.email",
    address: "1 The Street, Heresville",
    name: "Customer McCustomerface"
  },

  urlRoot: "/users",

});
