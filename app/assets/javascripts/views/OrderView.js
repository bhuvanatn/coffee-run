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
    initialize: function (options) {
        this.getId = options.getId;
    },
    render: function() {
        app.getCurrentUser(this);
        var id = this.getId.get('id'); //gets order id

        var store_id = this.getId.get("store_id"); // gets store id from order table
        var storeName = app.stores.get(store_id).attributes.name;
        var storeAddress = app.stores.get(store_id).attributes.address; // using store_id getting store name
        var total_price = this.getId.get("total_price"); // total_price gets from order table

        var customer_id = this.getId.get("customer_id");
        var customerName = app.customers.get(customer_id).attributes.name;
        var customerAddress = app.customers.get(customer_id).attributes.address;

        // var line_item = app.lineitems.get()

        orderViewTemplate = $('#OrderViewTemplate').html();
        var orderViewHTML = _.template(orderViewTemplate);

        var orderElement = orderViewHTML({StoreName: storeName, StoreAddress: storeAddress,CustomerName: customerName, CustomerAddress: customerAddress, TotalPrice: total_price });
        this.$el.html(orderElement);


    }
});
