var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'introduction',
    'stores' : 'showStoreList',
    'menu/:id' : 'showMenu',
    'orderlist' : 'showOrderList',
    'order/:id' : 'showOrder',
    'map' : 'showMap'
  },

  introduction: function() {
    var appView = new app.AppView();
    appView.render();
  },

  showStoreList: function () {
    app.stores = new app.Stores();
    app.stores.fetch().done( function () {
      var storeListView = new app.StoreListView();
      storeListView.render();
    });
  },

  showMenu: function (id) {
    app.store = new app.Store({id: id});
    app.store.fetch().done( function () {
      var menuView = new app.MenuView({model: app.store});
      menuView.render();
    }).error( function () {
      console.log("wtf");
    });
  },

  showOrderList: function () {
    app.orders = new app.Orders();
    app.stores = new app.Stores();
    app.customers = new app.Customer();
    app.current_user = new app.Current_User();
    app.lineitems = new app.LineItem();

    app.orders.fetch().done( function () {
      app.stores.fetch().done( function () {
        app.customers.fetch().done( function() {
          app.current_user.fetch().done( function() {
            app.lineitems.fetch().done( function() {
            var orderListView = new app.OrderListView();
            orderListView.render();
            });
          });
        });
      });
    });
  },

  showOrder: function (id) {
    app.order = new app.Order({id: id});
    app.order.fetch().done( function () {
      var orderView = new app.OrderView({model: app.order});
      orderView.render();
    }).error( function () {
      console.log('wtf');
    });
  },

  showMap: function() {
    var mapView = new app.MapView();
    mapView.render();
  }

});
