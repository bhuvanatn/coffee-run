var app = app || {};

app.CustomerView = Backbone.View.extend({
  el: '#main',
  events: {
    'click #show-cafes-btn': 'showCafes',
    'click #address-btn': 'setAddress',
    'click #auto-location-btn': 'geolocateUser'
  },

  render: function() {
    var customerViewTemplate = $('#customerViewTemplate').html();
    this.$el.html(customerViewTemplate);
    if (app.currentUser.latitude) {
      var button = $('<button>')
        .text('Find Cafes in my Area')
        .attr('id', 'show-cafes-btn');
      this.$el.append(button)
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

  geolocateUser: function () {
    console.log("geolocateUser");
  }
});
