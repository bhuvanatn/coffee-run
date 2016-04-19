var app = app || {};

app.OrderListView = Backbone.View.extend({
  el: '#main',

    render: function() {
      $('#main').html('');

      var userType = app.currentUser.attributes.type;

      if (userType === "Store"){
        orderListViewTemplate = $('#StoreOrderListViewTemplate').html();

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
            var orderElement = orderViewHTML(order);
            if (app.current_user.attributes.id === order.store_id){
            this.$el.append(orderElement);
          }
        }



      } else if (userType === "Runner") {
        orderListViewTemplate = $('#RunnerOrderListViewTemplate').html();

        var orderViewHTML = _.template(orderListViewTemplate);
          for (var i = 0; i < app.orders.length; i++){
            var order = app.orders.models[i].attributes;

            for (var j = 0; j < app.stores.length; j++){
              var storeId = app.stores.models[j].attributes.id;
              if (order.store_id === storeId){
                order.storeName = app.stores.models[j].attributes.name
              }
            }
            for (var k = 0; k < app.stores.length; k++){
              var customerId = app.customers.attributes[k].id;
              if (order.customer_id === customerId){
                order.customerName = app.customers.attributes[k].name
              }
            }
              if (app.orders.models[i].attributes.runner_id === null){
                var orderElement = orderViewHTML(order);
                this.$el.append(orderElement);
              }
            }
        } else {
        orderListViewTemplate = "";
      }
    }
  });
