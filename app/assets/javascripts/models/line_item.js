var app = app || {};

app.LineItem = Backbone.Model.extend({
  defaults: {
    quantity: "-1"
  },
  urlRoot: "/line_items"
  // parse: function () { make it happen in the server
  //   this.line_items = new app.Items();
  //   this.line_items.fetch();
  // }
});
