var app = app || {};

app.OrderListView = Backbone.View.extend({
  el: '#main',

    render: function() {
        var orderListViewTemplate = $('#OrderListViewTemplate').html();
        this.$el.html(orderListViewTemplate);
        $('#main').html(orderListViewTemplate);

        var orderViewTemplate = $('#OrderViewTemplate').html();
        var orderViewHTML = _.template(orderViewTemplate);

        for (var i = 0; i < app.orders.length; i++){
          var order = app.orders.models[i].attributes;
          var orderElement = orderViewHTML(order);
          this.$el.append(orderElement);
        }

    }
});
