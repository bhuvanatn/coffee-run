var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'stores' : 'showStoreList',
    'menu/:id' : 'showMenu',
    'orderlist' : 'showOrderList',
    'order/:id' : 'showOrder'
  },
  index: function() {
    var appView = new app.AppView();
    appView.render();
  },
  showStoreList: function () {
    // var storeView = new app.StoreView();
    // storeView.render();

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
    var orderListView = new app.OrderListView();
    orderListView.render();
  },

  showOrder: function (id) {
    app.Orders = new app.Orders({id: id});
    Order.fetch().done(function(){
      Order
    })
    app.order = new app.Order({id: id});
    app.order.fetch().done( function () {
      var orderView = new app.OrderView({model: app.order});
      orderView.render();
    });
  }

});
