var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'introduction',
    'customer': 'customerPath',
    'runner': 'runnerPath',
    'store': 'storePath',
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

  customerPath: function () {
    var customerView = new app.CustomerView();
    customerView.render();
  },

  runnerPath: function () {
    var runnerView = new app.RunnerView();
    runnerView.render();
  },

  storePath: function () {
    var storeView = new app.StoreView();
    storeView.render();
  },

  showStoreList: function () {
    storeListView.render();
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

    $.get('/orders_information').done( function (data){
      app.orders = new app.Orders(data.orders);
      app.stores = new app.Stores(data.stores);
      app.customers = new app.Customers(data.customers);
      app.lineitems = new app.LineItems(data.lineitems);
      app.items = new app.Items(data.items);

      var orderListView = new app.OrderListView();
      orderListView.render();
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
    var mapView = new app.OrderLiveMapView();
    mapView.render();
  }

});
