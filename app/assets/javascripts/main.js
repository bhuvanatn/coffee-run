var app = app || {};

app.getCurrentUser = function (view) {
  if (!app.currentUser) {
    $.get('/current_user').done( function (data) {
      app.currentUser = new app.User(data); //current user is a simple hash
      view.render();
    });
  }
}

app.showPrice = function (price) {
  priceInCents = Math.round(price*100);
  priceDollars = Math.floor(priceInCents / 100);
  priceCents = priceInCents % 100;
  centsString = priceCents.toString();
  while (centsString.length < 2) {
    centsString = 0 + centsString;
  }
  return priceDollars +'.'+ centsString;
}

var saveLocation = function () {
  app.currentUser.save();
}

app.saveLocation = _.throttle(saveLocation, 15000);

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
