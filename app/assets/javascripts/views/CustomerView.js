var app = app || {};

app.CustomerView = Backbone.View.extend({
  el: '#main',
  events: {
    'click #show-cafes-btn': 'showCafes',
    'click #address-btn': 'setAddress',
    'click #auto-location-btn': 'geolocateCustomer'
  },

  render: function() {
    app.getCurrentUser(this);
    var customerViewTemplate = $('#customerViewTemplate').html();
    this.$el.html(customerViewTemplate);
    if (app.currentUser.latitude) {
      var button = $('<button>')
        .text('Find Cafes in my Area')
        .attr('id', 'show-cafes-btn');
      this.$el.append(button);
    } else {
      var manualForm = $('#manualAddressTemplate').text();
      var autoForm = $('#automaticAddressTemplate').text();
      $('#addressDiscoveryContainer')
        .append(manualForm)
        .append(" or ")
        .append(autoForm);
    }
  },

  showCafes: function(){
    app.router.navigate('stores', true);
  },

  setAddress: function(){
    console.log("setAddress");
  },

  geolocateCustomer: function () {
    if (!navigator.geolocation) {
      alert("Sorry, your device doesn't support finding you automatically.");
      var manualForm = $('#manualAddressTemplate').text();
      $('#addressDiscoveryContainer')
        .append(manualForm);
      return;
    }
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(app.currentUser);
      app.currentUser.set({latitude: position.coords.latitude});
      app.currentUser.set({longitude: position.coords.longitude});
      console.log(app.currentUser);
      app.currentUser.save();
    });
  }
});
