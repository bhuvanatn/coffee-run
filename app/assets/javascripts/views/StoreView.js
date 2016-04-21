var app = app || {};

// what if geolocation fails or they enter an address????

app.StoreView = Backbone.View.extend({
  el: '#main',
  events: {
    'click #resetTypeButton': 'resetType',
    'click #menuButton': 'showMenu',
    'click #changeAddressButton': 'changeAddress',
    'click #address-btn': 'setAddress',
    'click #viewOrdersButton': 'viewOrders'
  },

  render: function() {
    app.getCurrentUser(this);

    var locationDiscussionTemplate = $('#locationDiscussionTemplate').text();
    this.$el.html(locationDiscussionTemplate);

    var storeLocationGreeting = $('#storeLocationGreetingTemplate').html();
    this.$el.find('#message').html(storeLocationGreeting);

    var resetTypeButton = $('#resetTypeButtonTemplate').html();
    var menuButton = $('#menuButtonTemplate').html();
    var changeAddressButton = $('#changeAddressButtonTemplate').html();
    var viewOrdersButton = $('#viewOrdersButtonTemplate').html();

    if (app.currentUser.get('longitude')) {
      var mapView = new app.MapView();
      mapView.render(app.currentUser.attributes);
      this.$el.find('#nav-buttons')
        .html(resetTypeButton)
        .append(changeAddressButton)
        .append(menuButton)
        .append(viewOrdersButton);
    } else {
      this.$el.find('#map').addClass("hide");
      var addressNeedMessage = $('#storeaddressNeed').html();
      this.$el.find('#message').append(addressNeedMessage);

      var manualForm = $('#manualAddressTemplate').text();
      $('#address-form')
        .html(manualForm);

      this.$el.find('#nav-buttons')
        .html(resetTypeButton);
    }
  },

  changeAddress: function () {
    this.$el.find('#map').addClass("hide");
    var manualForm = $('#manualAddressTemplate').text();
    $('#address-form')
      .html(manualForm);
    $('#address-input')[0].value = app.currentUser.get('address');
  },

  setAddress: function(){
    view = this;
    app.currentUser.set({address: $('#address-input')[0].value});
    app.currentUser.save().done( function () {
      view.render();
    });
  },

  resetType: function () {
    app.currentUser.set({type: null});
    app.currentUser.save();
    app.router.navigate('', true);
  },
  viewOrders: function () {
    app.router.navigate('orderlist', true);
  }
});
