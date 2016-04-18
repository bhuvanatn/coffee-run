var app = app || {};

app.OrderListView = Backbone.View.extend({
  el: '#main',

    render: function() {
        var orderListViewTemplate = $('#OrderListViewTemplate').html();
        var orderViewHTML = _.template(orderListViewTemplate);

        for (var i = 0; i < app.orders.length; i++){
          var order = app.orders.models[i].attributes;
          console.log(i);
          var orderElement = orderViewHTML(order);
          this.$el.append(orderElement);
        }

    }
});
