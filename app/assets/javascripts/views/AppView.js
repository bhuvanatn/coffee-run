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

    $.get('/current_user').done( function (data) {

      app.currentUser = new app.User(data); //current user is a simple hash
      var type = data.type;

      if (type === "Customer") {
        view.customerPath();
      } else if (type ==="Runner") {
        view.runnerPath();
      } else if (type === "Store") {
        view.storePath();
      } else if (type === null) {
        var appViewTemplate = $('#appViewTemplate').html();
        view.$el.html(appViewTemplate);
      }
    });

    // navigator.geolocation.getCurrentPosition(function(position) {
    //   do_something(position.coords.latitude, position.coords.longitude);
    // });
  },

  typeSetCustomer: function () {
    app.currentUser.set({'type': 'Customer'});
    app.currentUser.save();
    this.customerPath();
  },

  customerPath: function () {
    var customerView = new app.CustomerView();
    customerView.render();
  },

  typeSetRunner: function () {
    app.currentUser.set({type: "Runner"});
    app.currentUser.save();
    this.runnerPath();
  },

  runnerPath: function () {
    var runnerView = new app.RunnerView();
    runnerView.render();
  },

  typeSetStore: function () {
    app.currentUser.set({type: "Store"});
    app.currentUser.save();
    this.storePath();
  },

  storePath: function () {
    var storeView = new app.StoreView();
    storeView.render();
  }
});
