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
    //need to show store details, customer details and order details
    // )
    // initialize: function (options) {
    //     this.getId = options.getId;
    // },
    render: function() {
        app.getCurrentUser(this);

        // var id = this.getId.get('id'); //gets order id

        // var store_id = this.getId.get("store_id"); // gets store id from order table
        var storeName = app.store.get('name');
        var storeAddress = app.store.get('address');
        var total_price = app.order.get('total_price');
        var status = app.order.get('status');

        var customerName = app.customer.get('name');
        var customerAddress = app.customer.get('address');

        // var line_item = app.lineitems.get()

        orderViewTemplate = $('#OrderViewTemplate').html();
        var orderViewHTML = _.template(orderViewTemplate);

        var orderElement = orderViewHTML({StoreName: storeName, StoreAddress: storeAddress, CustomerName: customerName, CustomerAddress: customerAddress, TotalPrice: total_price });
        this.$el.html(orderElement);


    }
});
