var app = app || {};

app.Order = Backbone.Model.extend({
  defaults: {
    total_price: "-1"
  },
  urlRoot: "/orders"
  // parse: function () { make it happen in the server
  //   this.line_items = new app.Items();
  //   this.line_items.fetch();
  // }
});
