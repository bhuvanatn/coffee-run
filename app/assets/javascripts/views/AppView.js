var app = app || {};

app.AppView = Backbone.View.extend({

  el: '#main',

  events: {
    'click #customer-btn': 'typeSetCustomer',
    'click #store-btn': 'typeSetStore',
    'click #runner-btn': 'typeSetRunner'
  },

  render: function() {

    var view = this;
    app.getCurrentUser(view);

    var type = app.currentUser.get("type");

    if (type === "Customer") {
      app.router.navigate('customer', true);
    } else if (type ==="Runner") {
      app.router.navigate('runner', true);
    } else if (type === "Store") {
      app.router.navigate('store', true);
    } else if (type === null) {
      var appViewTemplate = $('#appViewTemplate').html();
      view.$el.html(appViewTemplate);
    }

    if ($('.navbar-right').children().eq(1).text() === "Login"){
      var appHomeView = $('#appHomeView').html();
      view.$el.html(appHomeView);
    }
  },

  typeSetCustomer: function () {
    app.currentUser.set({'type': 'Customer'});
    app.currentUser.save();
    app.router.navigate('customer', true);
  },

  typeSetRunner: function () {
    app.currentUser.set({type: "Runner"});
    app.currentUser.save();
    app.router.navigate('runner', true);
  },

  typeSetStore: function () {
    app.currentUser.set({type: "Store"});
    app.currentUser.save();
    app.router.navigate('store', true);
  }
});
