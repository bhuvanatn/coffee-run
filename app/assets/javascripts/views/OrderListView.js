var app = app || {};

app.OrderListView = Backbone.View.extend({
  el: '#main',

    render: function() {
      $('#main').html('');

      var userType = app.current_user.attributes.type;

      orderListViewTemplate = $('#' + userType + 'OrderListViewTemplate').html();
debugger;
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
                this.$el.append(orderElement);
            }
            else if (app.current_user.attributes.id === order.store_id){
                this.$el.append(orderElement);
            }
            else {
                orderListViewTemplate = "";
            }
        }
        this.showOrderDetails();
      },

      showOrderDetails: function(){
        $(".buttonJobDetails").on('click', function(){
          $(this).closest('div').children('.showJobDetails').toggle();
        });
      }


  });
