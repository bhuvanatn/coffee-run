var app = app || {};

// what if geolocation fails or they enter an address????

app.RunnerView = Backbone.View.extend({
  el: '#main',
  events: {
    'click #resetTypeButton': 'resetType',
    'click #getOrdersButton': 'showOrders'
  },

  render: function() {
    var view = this;
    app.getCurrentUser(this);

    var locationDiscussionTemplate = $('#locationDiscussionTemplate').html();
    this.$el.html(locationDiscussionTemplate);
    var runnerLocationGreeting = $('#runnerLocationGreeting').html();
    this.$el.find('#message').append(runnerLocationGreeting);

    var resetTypeButton = $('#resetTypeButtonTemplate').html();
    var getOrdersButton = $('#getOrdersButtonTemplate').html();

    navigator.geolocation.getCurrentPosition( function(position) { // success - you can be a runner
      app.watchID = navigator.geolocation.watchPosition( function(position) {
          app.currentUser.set({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          null,
          {
            maximumAge: 30000,
            enableHighAccuracy: true,
            timeout: 27000
          });
          app.currentUser.save();
      });
      view.$el.find('#nav-buttons')
        .html(resetTypeButton)
        .append(getOrdersButton);
    },
    function () { // failure - you can't be a runner
      var runnerLocationFailure = $('#runnerLocationFailure').html();
      this.$el.find('#message').append(runnerLocationFailure);
      view.$el.find('#nav-buttons')
        .html(resetTypeButton);
    });
  },

  showOrders: function () {
    app.router.navigate('orders', true);
  },

  resetType: function () {
    app.currentUser.set({type: null});
    app.currentUser.save();
    app.router.navigate('', true);
  }
});
