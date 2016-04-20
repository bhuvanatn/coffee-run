var app = app || {};

app.getCurrentUser = function (view) {
  if (!app.currentUser) {
    $.get('/current_user').done( function (data) {
      app.currentUser = new app.User(data); //current user is a simple hash
      view.render();
    });
  }
}

$(document).ready(function() {

    app.stores = new app.Stores();
    app.stores.fetch();

    app.orders = new app.Orders();

    app.line_items = new app.LineItems();

    
    // app.users = new app.Users();
    // app.users.fetch();


    // app.items = new app.Items();
    // app.items.fetch();

    app.router = new app.AppRouter();

    Backbone.history.start();

  });
