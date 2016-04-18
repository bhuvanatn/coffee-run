var app = app || {};

app.Item = Backbone.Model.extend({
  defaults: {
    name: "instant coffee",
    description: "It tastes genuinely awful",
    price: "-1"
  },
  urlRoot: function () {
    "/items"
  }
  // parse: function () { make it happen in the server
  //   this.line_items = new app.Items();
  //   this.line_items.fetch();
  // }
});
