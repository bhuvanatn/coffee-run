var app = app || {};

app.MenuView = Backbone.View.extend({
    el: '#main',
    events: {
        'click .change-qty': 'changeQuantity'
    },
    render: function() {
        var store = app.store.attributes;
        var menuViewTemplate = $('#MenuViewTemplate').html();
        var menuViewHTML = _.template(menuViewTemplate);
        this.$el.html(menuViewHTML(store));

        var items = new app.Items();
        items.fetch().done( function() {
            var itemViewTemplate = $('#ItemViewTemplate').html();
            var itemViewHTML = _.template(itemViewTemplate);
            for (var i = 0; i < items.length; i++) {
                var item = items.models[i].attributes;
                var itemElement = itemViewHTML(item);
                $('#items-list').append(itemElement);
            }

        }).error(function(f){

                console.log('error');
        });
    },
    changeQuantity: function(e) {
        var sign = e.currentTarget.id[0]; // the first element is the + or - sign
        var id = e.currentTarget.id.slice(1);
        var qty = parseInt($('#qty' + id).text());
        if (sign === '+') {
            qty += 1;
            var subMenu = this.addSubMenu(id);
            $('#item-submenu-' + id).append(subMenu);
        } else {
            qty -= 1;
        }
        $('#qty' + id).text(qty);

    },
    addSubMenu: function(itemID) {
        var itemSubmenuTemplate = $('#ItemSubmenuTemplate').html();
        var menuViewHTML = _.template(itemSubmenuTemplate);
        $('#item-submenu-' + itemID).append(menuViewHTML(itemID));
    }

});
