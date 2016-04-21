var app = app || {};

// what if geolocation fails or they enter an address????

app.CustomerView = Backbone.View.extend({
  el: '#main',
  events: {
    'click #resetTypeButton': 'resetType',

    'click #change-location-btn': 'setAddressFormWithFalse',
    'click #show-cafes-btn': 'showCafes',

    'click #address-btn': 'setAddress',
    'click #auto-location-btn': 'geolocateCustomer'
  },

  render: function() {
    app.getCurrentUser(this);

    var locationDiscussionTemplate = $('#locationDiscussionTemplate').text();
    this.$el.html(locationDiscussionTemplate);
    var customerLocationGreeting = $('#customerLocationGreeting').text();
    this.$el.find('#message').append(customerLocationGreeting);

    var resetTypeButton = $('#resetTypeButtonTemplate').html();

    if (app.currentUser.get('latitude')) {
      this.$el.find('#address-form').html('');

      var mapView = new app.MapView();
      mapView.render(app.currentUser.attributes);

      this.$el.find('#nav-buttons').html(resetTypeButton);
      var button = $('<button>')
        .text('Change Location')
        .attr('id', 'change-location-btn');
      this.$el.find('#nav-buttons').append(button);

      button = $('<button>')
        .text('Find Cafes in my Area')
        .attr('id', 'show-cafes-btn');
      this.$el.find('#nav-buttons').append(button);
    } else {
      this.$el.find('#map').addClass("hide");
      var customerAddressNeed = $('#customerAddressNeed').text();
      this.$el.find('#message').append(customerAddressNeed);
      this.$el.find('#nav-buttons').html(resetTypeButton);
      this.setAddressForm(false);
    }
  },

  setAddressFormWithFalse: function () {
    this.$el.find('#map').addClass("hide");
    this.setAddressForm(false);
  },

  setAddressForm: function (NoAuto) { // pass true if they can't geolocate, or geolocate fails.
    this.$el.find('#map').html('');
    this.$el.find('#nav-buttons').html('');
    var manualForm = $('#manualAddressTemplate').text();
    this.$el.find('#address-form')
      .html(manualForm);
    if (NoAuto) {
      this.$el.find('#address-form')
        .append($('<p/>').text("Automatic address finder unavailable"));
    } else {
      var autoForm = $('#automaticAddressTemplate').text();
      this.$el.find('#address-form')
        .append(" or ")
        .append(autoForm);
    }
  },

  showCafes: function(){
    app.router.navigate('stores', true);
  },

  setAddress: function(){
    app.currentUser.set({address: $('#address-input')[0].value});
    app.currentUser.save();
    this.render();
  },

  geolocateCustomer: function () {
    this.$el.find('#geoMessage').html("<p>Please wait</p>");

    var view = this;
    if (!navigator.geolocation) {
      alert("Sorry, your device doesn't support finding your address automatically.");
      setAddressForm(true);
      return;
    }
    window.navigator.geolocation.getCurrentPosition(function(position) {
      app.currentUser.set({latitude: position.coords.latitude});
      app.currentUser.set({longitude: position.coords.longitude});
      console.log(app.currentUser);
      app.currentUser.save();
      view.render();
    },
    function () { //executes on error
      setAddressForm(true);
    });
  },

  resetType: function () {
    app.currentUser.set({type: null});
    app.currentUser.save();
    app.router.navigate('', true);
  }
});
