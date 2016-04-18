var app = app || {};

app.StoreListView = Backbone.View.extend({
    el: '#main',
    events: {
    'click': 'showMenu'
    },
    render: function() {
      var stores = app.stores.toJSON();
      var storeListViewTemplate = $('#StoreListViewTemplate').html();
      this.$el.html(storeListViewTemplate);
      $('#main').html(storeListViewTemplate);
      var storeViewTemplate = $('#StoreViewTemplate').html();
      var storeViewHTML = _.template(storeViewTemplate);
      debugger;
      for (var i = 0; i < app.stores.length; i++) {
            var store = stores[i];
            var $store = storeViewHTML(store);

            this.$el.html(storeViewHTML(store));

      }
    }



});
