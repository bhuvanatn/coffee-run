var app = app || {};

app.StoreListView = Backbone.View.extend({
    tagName: 'li',
    events: {
    'click': 'showMenu'
    },
    render: function() {
      var storeListViewTemplate = $('#StoreListViewTemplate').html();
           this.$el.html(storeListViewTemplate);
    }



});
