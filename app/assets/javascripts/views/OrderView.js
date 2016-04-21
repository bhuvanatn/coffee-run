var app = app || {};

app.OrderView = Backbone.View.extend({
    el: '#main',
    events: {
        'click .job-btn': 'takeJob',
        'click .pickUp-btn': 'confirmPickUp',
        'click .delivered-btn': 'confirmDelivered'
    },

    render: function() {
        app.getCurrentUser(this);
        var userType = app.currentUser.attributes.type;

        if (userType === 'Customer' && app.order.attributes.status === 'pending') {
            $('#main').empty();
            var heading = document.createElement('h1');
            heading.setAttribute('id', 'awaitingConfirmation');
            $('#main').append(heading);
            $('#awaitingConfirmation').html('Awaiting Confirmation');
        }

        // var id = this.getId.get('id'); //gets order id

        // var store_id = this.getId.get("store_id"); // gets store id from order table
        var storeName = app.store.get('name');
        var storeAddress = app.store.get('address');
        var total_price = app.order.get('total_price');
        var status = app.order.get('status');

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

        var orderViewDiv = document.createElement('div');
        orderViewDiv.setAttribute('id', 'orderView');
        $('#main').append(orderViewDiv);

        $('#orderView').html(orderElement);

        if (app.currentUser.attributes.type === 'Runner' && app.order.attributes.status === 'pending') {
            var takeJobButton = document.createElement('button');
            takeJobButton.setAttribute('id', 'job' + app.order.get('id'));
            takeJobButton.setAttribute('class', 'btn takeJob job-btn');
            // takeJobButton.setAttribute('class', 'takeJob') ;
            $('#orderView').append(takeJobButton);
            $('.takeJob').html('Take Job');
        }
        if (app.currentUser.attributes.type === 'Runner' && app.order.attributes.status === 'confirmed') {
            var pickedUpButton = document.createElement('button');
            pickedUpButton.setAttribute('id', 'pick-up-' + app.order.get('id'));
            pickedUpButton.setAttribute('class', 'btn pickedUp pickUp-btn');
            $('#orderView').append(pickedUpButton);
            $('.pickedUp').html('Picked Up');
        }
        if (app.currentUser.attributes.type === 'Runner' && app.order.attributes.status === 'pickedUp') {
            var deliveredButton = document.createElement('button');
            deliveredButton.setAttribute('id', 'delivered-' + app.order.get('id'));
            deliveredButton.setAttribute('class', 'btn delivered delivered-btn');
            $('#orderView').append(deliveredButton);
            $('.delivered').html('Delivered');
        }

        if (app.currentUser.attributes.type === 'Customer') {
            this.polling();
        }


    },

    polling: function() {
        if (!app.orderPolling) {
            app.orderPolling = window.setInterval(function(){
                app.orders = new app.Orders(app.order);
                app.orders.fetch().done(function(){
                    if (app.order.attributes.status === 'confirmed') {
                        window.clearInterval(app.orderPolling);
                        app.runner = new app.Runner({id: app.order.attributes.runner_id});
                        app.runner.fetch().done(function(){
                            var liveMap = new app.OrderLiveMapView();
                            liveMap.render(app.runner.attributes, app.currentUser.attributes, app.store.attributes);
                        });
                    }
                });
            }, 10000);
        }
    },

    takeJob: function(e) {
          window.clearInterval(app.ordersPolling);
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
    },

    confirmPickUp: function() {
        app.order.attributes.status = 'pickedUp';
        app.order.save().done(function(){
            $('#orderView').remove();
            var pickUpOrderView = new app.OrderView();
            pickUpOrderView.render();
        });
    },

    confirmDelivered: function() {
        app.order.attributes.status = 'delivered';
        app.order.save();
        app.router.navigate('orderlist', true);
    }
});
