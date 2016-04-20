var app = app || {};

app.OrderListView = Backbone.View.extend({
  el: '#main',
  events: {
  'click #toggleListBtn': 'showListView',
  'click #toggleMapBtn': 'showMapView',
  'click .job-btn': 'takeJob',
  'click .order-btn': 'viewOrder'
  },

    render: function() {
      app.getCurrentUser(this);
      $('#main').html('');

      var userType = app.current_user.attributes.type;

      orderListViewTemplate = $('#' + userType + 'OrderListViewTemplate').html();

      if (userType === 'Runner') {
          //clear #main
          $('#main').empty();
          //add list view button
          var toggleListDiv = document.createElement('button');
               toggleListDiv.setAttribute('id', 'toggleListBtn');
               toggleListDiv.setAttribute('class', 'toggleBtn');
               $('#main').append(toggleListDiv);
               $('#toggleListBtn').html('List View');
          //add map view button
          var toggleMapDiv = document.createElement('button');
              toggleMapDiv.setAttribute('id', 'toggleMapBtn');
              toggleMapDiv.setAttribute('class', 'toggleBtn');
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

      orderListViewTemplate = $('#' + userType + 'OrderListViewTemplate').html(); //changes according to usertype ie. runner or store

      var orderViewHTML = _.template(orderListViewTemplate);
        for (var i = 0; i < app.orders.length; i++){
            var order = app.orders.models[i].attributes;

            for (var j = 0; j < app.stores.length; j++){
                var storeId = app.stores.models[j].attributes.id;
                if (order.store_id === storeId){
                    order.storeName = app.stores.models[j].attributes.name;
                }
            }
            for (var k = 0; k < app.stores.length; k++){
                var customerId = app.customers.attributes[k].id;
                if (order.customer_id === customerId){
                    order.customerName = app.customers.attributes[k].name;
                }
            }

            var lineIds = _(app.lineitems.attributes).map(function (i) { return i.order_id; });
            lineIds = _(lineIds).compact();

            for (var l = 0; l < lineIds.length; l++){
              var lineItemIds = lineIds[l];
              if (lineItemIds === app.orders.models[i].attributes.id){
                  order.lineItemId = app.lineitems.attributes[l].order_id
              }
            }

            var orderElement = orderViewHTML(order);
            if (app.orders.models[i].attributes.runner_id === null){
                $('#list-view').append(orderElement);
            }
            else if (app.current_user.attributes.id === order.store_id){
                $('#main').append(orderElement);
            }
            else {
                orderListViewTemplate = "";
            }
        }

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
          app.router.navigate('order/' + e.currentTarget.id.slice(5), true);
      },
      takeJob: function(e) {
        console.log('takeJob');
        console.log(e);
        this.showOrderDetails();
      },

      showOrderDetails: function(){
        $(".buttonJobDetails").on('click', function(){
          $(this).closest('div').children('.showJobDetails').toggle();
        });
      }


  });
