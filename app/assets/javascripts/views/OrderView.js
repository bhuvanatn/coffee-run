var app = app || {};

app.OrderView = Backbone.View.extend({
    el: '#main',

    render: function() {
        app.getCurrentUser(this);
        var order = app.order.attributes;
        orderViewTemplate = $('#OrderViewTemplate').html();
        var orderViewHTML = _.template(orderViewTemplate);
        var orderElement = orderViewHTML(order);
        $('#main').append(orderElement);
        //need to show store details, customer details and order details
    }
});
