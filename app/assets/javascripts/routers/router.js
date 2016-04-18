var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'storelist' : 'showStoreList',
    'menu/:id' : 'showMenu',
    'orderlist' : 'showOrderList',
    'order/:id' : 'showOrder'
  },
  index: function() {
        var appView = new app.AppView();
        appView.render();
      },
  showStoreList: function () {
    var storeView = new app.StoreView();
    storeView.render();
  },

  showMenu: function (id) {
    app.store = new app.Store({id: id});
    store.fetch().done( function () {
      var menuView = new app.MenuView({model: app.store});
      menuView.render();
    }).error( function () {
      console.log("wtf");
    });
  },

  showOrderList: function () {},

  showOrder: function () {}

});
