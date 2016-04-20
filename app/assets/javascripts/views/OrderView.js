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
        $('#main').html('');
        orderViewTemplate = $('#OrderViewTemplate').html();
        var orderViewHTML = _.template(orderViewTemplate);
    }
});
