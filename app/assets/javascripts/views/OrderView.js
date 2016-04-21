var app = app || {};

app.OrderView = Backbone.View.extend({
    el: '#main',
    events: {
        'click .job-btn': 'takeJob'
    },
    // Customer
    //
    // 1. Store list (#stores)
    // 2. Store Menu (menu/:id)
    // 3. Order (
    //
    // Store: The Store that the order was made at
    // Customer Name: Who made the order
    // Items: All items they requested (quantity)
    // Price: Total price of the items
    //need to show store details, customer details and order details
    // )
    // initialize: function (options) {
    //     this.getId = options.getId;
    // },
    render: function() {
        app.getCurrentUser(this);
        var userType = app.currentUser.attributes.type;

        // var id = this.getId.get('id'); //gets order id

        // var store_id = this.getId.get("store_id"); // gets store id from order table
        var storeName = app.store.get('name');
        var storeAddress = app.store.get('address');
        var total_price = app.order.get('total_price');

        var customerName = app.customer.get('name');
        var customerAddress = app.customer.get('address');

        // var line_item = app.lineitems.get()

        orderViewTemplate = $('#' + userType + 'OrderViewTemplate').html();
        var orderViewHTML = _.template(orderViewTemplate);

        var orderElement = orderViewHTML({
          StoreName: storeName,
          StoreAddress: storeAddress,
          CustomerName: customerName,
          CustomerAddress: customerAddress,
          TotalPrice: total_price,
          Status: app.order.get("status"),
          id: app.order.get('id')
        });

        this.$el.html(orderElement);

        if (app.currentUser.attributes.type === 'Customer') {
            this.polling();
        }


    },

    polling: function() {
        if (!app.orderPolling) {
            app.orderPolling = setInterval(function(){
                app.order.fetch().done(function(){
                    if (app.order.attributes.status === 'confirmed') {
                        app.orderPolling.clearInterval();
                        var liveMap = new app.OrderLiveMapView();
                        app.runner = new app.Runner({id: app.order.attributes.runner_id});
                        app.runner.fetch().done(function(){
                            liveMap.render(runner, app.currentUser.attributes, app.store.attributes);
                        });
                    }
                });
            }, 10000);
        }
    },
    takeJob: function(e) {
          app.getCurrentUser(this);
          var orderID = parseInt(e.target.id.slice(3));
          var currentUserId = app.currentUser.id;
            for (var i = 0; i < app.orders.length; i++){
              if (app.orders.models[i].attributes.id === orderID){
                if (app.orders.models[i].attributes.status === 'pending'){

                  var confirmButton = confirm('Are you sure?');
                  if (confirmButton === true){
                    app.orders.models[i].attributes.status = 'confirmed';
                    app.orders.models[i].attributes.runner_id = currentUserId;
                    app.order = app.orders.models[i];

                    app.order.save().done(function(){
                    });
                    var liveMap = new app.OrderLiveMapView();
                    // var order = app.orders.findWhere({id: orderID});
                    liveMap.render(app.customers.findWhere({id: app.order.attributes.customer_id}).attributes,
                                    app.currentUser.attributes,
                                    app.stores.findWhere({id: app.order.attributes.store_id}).attributes
                                  );



                  } else {
                    break;
                  }
              }
            }
         }
    }
});
