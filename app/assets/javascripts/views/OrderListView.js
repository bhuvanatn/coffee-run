var app = app || {};

app.OrderListView = Backbone.View.extend({
  el: '#main',
  events: {
  'click #toggleListBtn': 'showListView',
  'click #toggleMapBtn': 'showMapView',
  'click .job-btn': 'takeJob',
  'click .customer-view-btn': 'viewOrder',
  'click .pickup-btn': 'confirmPickUp',
  'click .order-btn': 'showOrderDetails',
  'click .buttonJobDetails': 'viewOrder',
  'click .ready-pickup-btn': 'orderMade'
  },


    render: function() {
      app.view = this;
      app.getCurrentUser(this);
      $('#main').html('');

      var userType = app.currentUser.attributes.type;

      orderListViewTemplate = $('#' + userType + 'OrderListViewTemplate').html();

      if (userType === 'Runner') {
          //clear #main
          $('#main').empty();

          //add list view button
          var toggleListDiv = $('<button/>');
               toggleListDiv.attr('id', 'toggleListBtn');
               toggleListDiv.attr({
                 'class':'toggleBtn',
                 'class':'clickButton',
               }).css({
                 'marginTop': '10px',
                 'marginLeft': '-180px',
                 'marginBottom': '21px'
               });
               $('#main').append(toggleListDiv);
               $('#toggleListBtn').html('List View');


          //add map view button
          var toggleMapDiv = $('<button/>');
              toggleMapDiv.attr('id', 'toggleMapBtn');
              toggleMapDiv.attr({
                'class':'toggleBtn',
                'class':'clickButton',
              }).css({
                'marginTop': '10px',
                'marginLeft': '20px',
                'marginBottom': '21px'
              });
              $('#main').append(toggleMapDiv);
              $('#toggleMapBtn').html('Map View');
            //add list view div
            var addListViewDiv = document.createElement('div');
                 addListViewDiv.setAttribute('id', 'list-view');
                 addListViewDiv.setAttribute('class', 'hide');
                 $('#main').append(addListViewDiv);
            //add map view div
            var addMapViewDiv = document.createElement('div');
                  addMapViewDiv.setAttribute('id', 'map-view');
                  $('#main').append(addMapViewDiv);

            app.orders.fetch().done(function(){
                  var mapDiv = document.createElement('div');
                  mapDiv.setAttribute('id', 'map');
                  $('#map-view').append(mapDiv);

                  var storeMap = new app.MapView();

                  var availableOrders = app.orders.where({'runner_id': null });
                  var availableOrderStores = [];

                  for (var i = 0; i < availableOrders.length; i++) {
                      var store = app.stores.findWhere({'id': availableOrders[i].attributes.store_id});

                      store.attributes.order_id = availableOrders[i].attributes.id;
                      availableOrderStores.push(store);
                  }

                  storeMap.render(app.currentUser.attributes, availableOrderStores);
            });

      }


      //Loop to show all the orders and add in necessary information like
      // Storename, Customer name etc
      var orderViewHTML = _.template(orderListViewTemplate);
        for (var i = 0; i < app.orders.length; i++){
            var order = app.orders.models[i].attributes;

            for (var j = 0; j < app.stores.length; j++){

                var storeId = app.stores.models[j].attributes.id;
                if (order.store_id === storeId){
                    order.storeName = app.stores.models[j].attributes.name;
                }
            }


            var customerName = app.customers.findWhere({id: order.customer_id}).get('name');
            order.customerName = customerName;

            // Loops through the lineItems and pulls out and stores the ID, Name and Quantity of each item
            var lineIds = _(app.lineitems.attributes).map(function (i) { return i.order_id; });
            lineIds = _(lineIds).compact();

            var orderItemArr = [];
            var orderItemNameArr = [];
            var orderItemQuantityArr = [];
            for (var m = 0; m < lineIds.length; m++){
              var lineItemIds = lineIds[m];
              if (lineItemIds === app.orders.models[i].attributes.id){
                  orderItemArr.push(app.lineitems.attributes[m].item_id);
                  orderItemNameArr.push(app.lineitems.attributes[m].name);
                  orderItemQuantityArr.push(app.lineitems.attributes[m].quantity);
              }
            }

            // Loops through all the line items and prints out a new line.
            var lines = '';
            for (var n = 0; n < orderItemArr.length; n++ ){
              lines += '<p>' + orderItemNameArr[n] + ' : ' + orderItemQuantityArr[n] + ' ' +'</p>';
            }
            order.allLines = lines;

            var orderElement = orderViewHTML(order);
            if ( userType === 'Runner' && app.orders.models[i].attributes.runner_id === null){
                $('#list-view').append(orderElement);
            }
            else if ( userType === 'Store' && app.orders.models[i].attributes.store_id === app.currentUser.id){
                $('#main').append(orderElement);
            }
            else if (app.currentUser.attributes.id === order.customer_id){
                $('#main').append(orderElement);
            }
        }

      this.polling();

      },

      showListView: function() {
          $('#list-view').removeClass('hide');
          $('#map-view').addClass('hide');
      },
      showMapView: function() {
        $('#list-view').addClass('hide');
        $('#map-view').removeClass('hide');
      },
      viewOrder: function(e) {
        var orderID = parseInt($(e.target).parent().attr('id'));
        app.router.navigate('order/' + orderID, true);

      },
      takeJob: function(e) {
        window.clearInterval(app.ordersPolling);
        app.ordersPolling = null;
        // this.showOrderDetails();
          var orderID = parseInt($(e.target).parent().attr('id'));
          var currentUserId = app.currentUser.attributes.id;

            for (var i = 0; i < app.orders.length; i++){
              if (app.orders.models[i].attributes.id === orderID){
                if (app.orders.models[i].attributes.status === 'pending'){
                  var confirmButton = confirm('Are you sure?');
                  if (confirmButton === true){
                    
                    app.order = app.orders.findWhere({id: orderID});
                    app.order.set({'status': 'confirmed', runner_id: app.currentUser.id});
                    app.order.save();

                      var liveMap = new app.OrderLiveMapView();


                      liveMap.render(app.customers.findWhere({id: app.order.attributes.customer_id}).attributes,
                                      app.currentUser.attributes,
                                      app.stores.findWhere({id: app.order.attributes.store_id}).attributes
                                    );




                    // app.router.navigate('order/' + orderID, true);

                  } else {
                    break;
                  }
              }
            }
          }
      },

      confirmPickUp: function(e) {
          var orderID = parseInt($(e.target).parent().attr('id'));
          var currentUserId = app.currentUser.attributes.id;

            for (var i = 0; i < app.orders.length; i++){
              if (app.orders.models[i].attributes.id === orderID){
                if (app.orders.models[i].attributes.status === 'confirmed'){
                  var confirmButton = confirm('Are you sure?');
                  if (confirmButton === true){
                    app.orders.models[i].save({'status': 'pickedUp'});
                    $('#' + orderID).hide();
                  } else {
                    break;
                  }
              }
            }
          }
      },


      showOrderDetails: function(e){
          $(e.this).parent('div').children('.showJobDetails').toggle();
      },



    polling: function () {
      if (!app.ordersPolling) {
        app.ordersPolling = window.setInterval(function(){
          $.get('/orders_information').done( function (data){
            app.orders = new app.Orders(data.orders);
            app.stores = new app.Stores(data.stores);
            app.customers = new app.Customers(data.customers);
            app.lineitems = new app.LineItems(data.line_items);
            app.items = new app.Items(data.items);
            app.view.render();  //do we need this??
          });
        }, 15000);
      }
    },

    orderMade: function(e) {
      var orderId = e.currentTarget.id.slice(7);
      $('#' + orderId).remove();
      app.order = app.orders.findWhere({id: parseInt(e.currentTarget.id.slice(7))});
      app.order.attributes.status = 'made';
      app.order.save();
    }
});
