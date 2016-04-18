var app = app || {};

app.OrderView = Backbone.View.extend({
    el: '#main',

    render: function() {
        var orders = new app.Orders();
        orders.fetch().done(function() {
            console.log(lineItems);
        });
    }
});
