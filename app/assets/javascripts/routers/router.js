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
        if (app.currentUser === 'Customer') {
            id = parseInt(id);
            $.get('/orders_information').done (function (data) {
              app.orders = new app.Orders(data.orders);
              app.stores = new app.Stores(data.stores);
              app.customers = new app.Customers(data.customers);
              app.lineitems = new app.LineItems(data.line_items);
              app.items = new app.Items(data.items);

              app.order = new app.Order(app.orders.findWhere({'id': id}).attributes);
              app.store = new app.Store(app.stores.findWhere({'id': app.order.attributes.store_id}).attributes);
              app.customer = new app.Customer(app.customers.findWhere({'id': app.order.attributes.customer_id}).attributes);
              app.orderlineitems = new app.LineItems(app.lineitems.where({'order_id': id}));
              app.orderitems = new app.Items();
              for (var i = 0; i < app.orderlineitems.length; i++) {
                  app.orderitems.push(app.items.findWhere({'id': app.orderlineitems.models[i].attributes.item_id}));
              }

              var orderView = new app.OrderView();
              orderView.render();
            });
        }
        else {
          var orderView = new app.OrderView();
                app.order = new app.Order(app.orders.findWhere({'id': id}));
                app.store = new app.Store(app.stores.findWhere({'id': app.order.store_id}));
                app.customer = new app.Customer(app.customers.findWhere({'id': app.order.customer_id}));
                app.orderlineitems = new app.LineItems(app.lineitems.where({'id': id}));
                app.orderitems = new app.Items();
                for (var i = 0; i < app.orderlineitems.length; i++) {
                    app.orderitems += app.items.findWhere({'id': app.orderlineitems[i].item_id});
                }

          orderView.render();
        }



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
