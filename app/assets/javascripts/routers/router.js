var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    'storelist' : 'showStoreList',
    'menu/:id' : 'showMenu',
    'orderlist' : 'showOrderList',
    'order/:id' : 'showOrder'
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
