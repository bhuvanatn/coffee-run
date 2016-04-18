var app = app || {};

app.StoreListView = Backbone.View.extend({
    el: '#main',
    events: {
    'click .store': 'showMenu'
    },
    render: function() {

      var storeListViewTemplate = $('#StoreListViewTemplate').html();
      this.$el.html(storeListViewTemplate);
      $('#main').html(storeListViewTemplate);
 
      var storeViewTemplate = $('#StoreViewTemplate').html();
      var storeViewHTML = _.template(storeViewTemplate);

      for (var i = 0; i < app.stores.length; i++) {
            var store = app.stores.models[i].attributes;
            var storeElement = storeViewHTML(store);
            this.$el.append(storeElement);
      }
  },
  showMenu: function(e) {
      app.router.navigate('menu/' + e.currentTarget.id, true);
  }



});
