var app = app || {};

app.MenuView = Backbone.View.extend({
    el: '#main',
    render: function() {
        var store = app.store.attributes;
        var menuViewTemplate = $('#MenuViewTemplate').html();
        var menuViewHTML = _.template(menuViewTemplate);
        this.$el.html(menuViewHTML(store));
    }

});
