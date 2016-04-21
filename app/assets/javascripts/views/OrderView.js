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

        // var line_item = app.lineitems.get()

        orderViewTemplate = $('#OrderViewTemplate').html();
        var orderViewHTML = _.template(orderViewTemplate);


        var orderElement = orderViewHTML({
          StoreName: app.store.get('name'),
          StoreAddress: app.store.get('name'),
          CustomerName: app.customer.get('name'),
          CustomerAddress: app.customer.get('address'),
          TotalPrice: app.order.get('total_price'),
          Status: app.order.get("status"),
          id: app.order.get('id'),
        });

        var orderViewDiv = document.createElement('div');
        orderViewDiv.setAttribute('id', 'orderView');
        $('#main').append(orderViewDiv);

        $('#orderView').html(orderElement);

        var itemOrderView = $('#itemOrderViewTemplate').html();
        var itemOrderViewHTML = _.template(itemOrderView);


        for (var i = 0; i < app.line_items.length; i++) {
            var itemId = app.line_items.models[i].attributes.item_id;
            var item = app.items.findWhere({id: itemId});
            var itemName = item.attributes.name;
            app.line_items.models[i].set({item_name: itemName});
            $('#itemOrderView').append(itemOrderViewHTML(app.line_items.models[i].attributes));
        }

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
                        console.log(app.order);
                        app.runner = new app.Runner({id: app.order.attributes.runner_id});
                        console.log(app.runner);
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
                    console.log('1', app.orders.models[i]);
                  var confirmButton = confirm('Are you sure?');
                  if (confirmButton === true){
                    app.orders.models[i].set({status: 'confirmed'});
                    console.log('2', app.orders.models[i]);
                    app.orders.models[i].set({runner_id: app.currentUser.id});
                    console.log('3', app.orders.models[i]);
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
