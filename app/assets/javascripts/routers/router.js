var app = app || {};

app.AppRouter = Backbone.Router.extend({
    routes: {
        '': 'introduction',
        'customer': 'customerPath',
        'runner': 'runnerPath',
        'store': 'storePath',
        'stores': 'showStoreList',
        'menu/:id': 'showMenu',
        'orderlist': 'showOrderList',
        'order/:id': 'showOrder',
        'map': 'showMap'
    },

    introduction: function() {
        var appView = new app.AppView();
        appView.render();
    },

    customerPath: function() {
        var customerView = new app.CustomerView();
        customerView.render();
    },

    runnerPath: function() {
        var runnerView = new app.RunnerView();
        runnerView.render();
    },

    storePath: function() {
        var storeView = new app.StoreView();
        storeView.render();
    },


  showStoreList: function () {
    var storeListView = new app.StoreListView();
    storeListView.render();
  },


    showMenu: function(id) {
        app.store = new app.Store({
            id: id
        });
        app.store.fetch().done(function() {
            var menuView = new app.MenuView({
                model: app.store
            });
            menuView.render();
        }).error(function() {
            console.log("wtf");
        });
    },


  showOrderList: function () {
    $.get('/orders_information').done( function (data){
        app.orders = new app.Orders(data.orders);
        app.stores = new app.Stores(data.stores);
        app.customers = new app.Customers(data.customers);
        app.lineitems = new app.LineItems(data.line_items);
        app.items = new app.Items(data.items);

       var orderListView = new app.OrderListView();
       orderListView.render();
      });

    },

    showOrder: function(id) {
      id = parseInt(id)

      $.get('/order_associations/'+id).done (function (data) {
        app.order = new app.Order(data.order);
        app.store = new app.Store(data.store);
        app.customer = new app.Customer(data.customer);
        app.orderlineitems = new app.LineItems(data.lineItems);
        app.orderitems = new app.Items(data.items);
        var orderView = new OrderView();
        orderView.render();
      });
    },

    // showOrder: function(id) {
    //     app.orders = new app.Orders({
    //         id: id
    //     });
    //     app.stores = new app.Stores();
    //     app.customers = new app.Customers();
    //     app.order = app.order || {};
    //     app.order.id = id;
    //     app.lineitems = new app.LineItems();
    //
    //         app.customers.fetch().done(function() {
    //             app.lineitems.fetch().done(function() {
    //               app.stores.fetch().done(function() {
    //                 app.orders.fetch().done(function() {
    //                     var orderView = new app.OrderView({
    //                         model: app.orders,
    //                         getId: app.orders.get(id)
    //                     });
    //                     orderView.render();
    //                 }).error(function() {
    //                     console.log('wtf');
    //                 });
    //             });
    //         });
    //     });
    // },

    showMap: function() {
        var mapView = new app.OrderLiveMapView();
        mapView.render();
    }

});
