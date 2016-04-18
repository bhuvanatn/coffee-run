var app = app || {};

app.Customer = Backbone.Model.extend({
  defaults: {
    email: "yep@ivegot.email",
    address: "1 The Street, Heresville",
    name: "Customer McCustomerface"
  },
  urlRoot: "/customers"
});
