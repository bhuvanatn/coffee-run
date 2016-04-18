var app = app || {};

app.MenuView = Backbone.View.extend({
    el: '#main',

    events: {
        'click .change-qty': 'changeQuantity',
        'click #submit-order-btn': 'sendOrder',
        'click #cancel-order-btn': 'cancelOrder'
    },

    render: function() {
        var store = app.store.attributes;

        var menuViewTemplate = $('#MenuViewTemplate').html();
        var menuViewHTML = _.template(menuViewTemplate);
        this.$el.html(menuViewHTML(store));

        var order = new app.Order({store_id: store.id});
        app.orders.add (order);

        store.order_id = order.id; //this is to get access to order.id in the event.currentTarget

        app.items = new app.Items();
        app.items.fetch().done( function() {
            var itemViewTemplate = $('#ItemViewTemplate').html();
            var itemViewHTML = _.template(itemViewTemplate);
            for (var i = 0; i < app.items.length; i++) {
                var item = app.items.models[i].attributes;
                var itemElement = itemViewHTML(item);
                $('#items-list').append(itemElement);
            }

        }).error(function(f){

                console.log('error');
        });
    },

    changeQuantity: function(e) {
        var sign = e.currentTarget.id[0]; // the first element is the + or - sign
        var id = parseInt(e.currentTarget.id.slice(1));
        var qty = parseInt($('#qty' + id).text());
        var item = app.items.findWhere({'id': id}).attributes;
        var order = app.orders.models[0].attributes;  /// this needs to be fixed [0] - needs to select last element in orders array
        var lineItem;
        var subMenu;

        var addSubMenu = function(itemID, itemQty) {
            var itemSubmenuTemplate = $('#ItemSubmenuTemplate').html();
            var menuViewHTML = _.template(itemSubmenuTemplate);
            var itemInfo = {id: itemID, qty: itemQty};
            var itemSubmenu = menuViewHTML(itemInfo);
            $('#item-submenu-' + itemID).append(itemSubmenu);
        };

        if (sign === '+') {
            qty += 1;
            lineItem = new app.LineItem({item_id: item.id, quantity: 1, order_id: order.id, unit_price: item.price, notes: qty.toString() });
            app.line_items.add( lineItem );
            subMenu = addSubMenu(id, qty);
            $('#item-submenu-' + id).append(subMenu);
        } else {
                lineItem = app.line_items.findWhere({'item_id': id, "notes": qty.toString()});
                app.line_items.remove( lineItem );
                qty -= 1;
                $('#item-submenu-'+ id).children().last().remove();
        }

        ///update quantity
        lineItem = app.line_items.findWhere({'item_id': id});
        $('#qty' + id).text(qty);
        var itemPrice = parseFloat(app.items.findWhere({'id': id}).attributes.price);
        var newItemTotal = itemPrice * qty;
        $("#" +id+ "-total-price").text(newItemTotal);
        var orderTotal = parseFloat($('#menu-total-price').text());
        var newOrderTotal = orderTotal + itemPrice;
        $('#menu-total-price').text(newOrderTotal);

    },

    sendOrder: function() {
        var lineItems = app.line_items;
        var orderTotalPrice = 0;
        var order = app.orders.findWhere({'total_price': '-1' });
        order.save().done(function(){
            var order = app.orders.findWhere({'total_price': '-1' });
            for (var i = 0; i < lineItems.length; i++) {
                var lineItem = lineItems.models[i].attributes;
                var size = $('#size' + lineItem.item_id + lineItem.notes).val();
                var sugar = $('#sugars' + lineItem.item_id + lineItem.notes).val();
                var milk = $('#milk' + lineItem.item_id + lineItem.notes).val();
                var note = 'size: ' + size + ', sugars: ' + sugar + ', milk: ' + milk;

                var model = app.line_items.findWhere({'item_id': lineItem.item_id, 'notes': lineItem.notes});

                lineItem.notes = note;
                lineItem.order_id = order.id;
                orderTotalPrice += lineItem.unit_price * lineItem.quantity;
                model.save();
            }
            order.attributes.total_price = orderTotalPrice;
            order.save();
        });
        //var order = app.orders.findWhere({'id': lineItems.models[0].attributes.order_id});
    },
    cancelOrder: function() {
        var model = app.orders.findWhere({'total_price': '-1'});
        app.orders.remove( model );
        app.router.navigate('');
    }

});
