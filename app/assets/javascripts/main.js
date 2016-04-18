var app = app || {};

$(document).ready(function() {

    app.stores = new app.Stores();
    app.stores.fetch();

    // app.users = new app.Users();
    // app.users.fetch();


    // app.items = new app.Items();
    // app.items.fetch();

    app.router = new app.AppRouter();

    Backbone.history.start();

  });
