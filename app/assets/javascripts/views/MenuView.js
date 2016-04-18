var app = app || {};

app.MenuView = Backbone.View.extend({
    el: '#main',
    render: function() {
        var menuViewTemplate = $('#MenuViewTemplate').html();
        this.$el.html(menuViewTemplate);
        debugger;
    }

});
