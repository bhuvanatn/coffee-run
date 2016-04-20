var app = app || {};

app.OrderView = Backbone.View.extend({
    el: '#main',
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
    // )
    render: function() {


        app.getCurrentUser(this);
        for (var i = 0; i < app.order.length; i++){
            var x = app.orders.models[0].attributes.store_id;
            if (x === )
        }
        orderViewTemplate = $('#OrderViewTemplate').html();
        var orderViewHTML = _.template(orderViewTemplate);
        var orderElement = orderViewHTML(order);
        $('#main').append(orderElement);
        //need to show store details, customer details and order details
    }
});
