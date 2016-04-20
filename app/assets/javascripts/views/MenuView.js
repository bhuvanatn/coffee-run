var app = app || {};

app.MenuView = Backbone.View.extend({
    el: '#main',

    events: {
        'click .change-qty': 'changeQuantity',
        'click #submit-order-btn': 'sendOrder',
        'click #cancel-order-btn': 'cancelOrder'
    },

    render: function() {
        app.getCurrentUser(this);

        var store = app.store.attributes;

        var menuViewTemplate = $('#MenuViewTemplate').html();
        var menuViewHTML = _.template(menuViewTemplate);
        this.$el.html(menuViewHTML(store));

        app.order = new app.Order({store_id: store.id});

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
            lineItem = new app.LineItem({item_id: item.id, quantity: 1, order_id: app.order.id, unit_price: item.price, notes: qty.toString() });
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
        var orderTotalPrice = 0;
        app.order.save().done(function(){
            for (var i = 0; i < app.line_items.length; i++) {
                var lineItem = app.line_items.models[i].attributes;
                var size = $('#size' + lineItem.item_id + lineItem.notes).val();
                var sugar = $('#sugars' + lineItem.item_id + lineItem.notes).val();
                var milk = $('#milk' + lineItem.item_id + lineItem.notes).val();
                var note = 'size: ' + size + ', sugars: ' + sugar + ', milk: ' + milk;


                lineItem.notes = note;
                lineItem.order_id = app.order.id;
                orderTotalPrice += lineItem.unit_price * lineItem.quantity;
                app.line_items.models[i].save();
            }
            app.order.attributes.total_price = orderTotalPrice;
            app.order.save();
        });
    },
    cancelOrder: function() {
        app.order = undefined;
        app.router.navigate('');
    }

});
