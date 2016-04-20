var app = app || {};

// what if geolocation fails or they enter an address????

app.StoreView = Backbone.View.extend({
  el: '#main',
  events: {
    'click #resetTypeButton': 'resetType',
    'click #menuButton': 'showMenu',
    'click #changeAddressButton': 'changeAddress',
    'click #address-btn': 'setAddress'
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

    if (app.currentUser.get('address')) {
      this.$el.find('#nav-buttons')
        .html(resetTypeButton)
        .append(changeAddressButton)
        .append(menuButton);
    } else {
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
    var manualForm = $('#manualAddressTemplate').text();
    $('#address-form')
      .html(manualForm);
    $('#address-input').value(app.currentUser.get('address'));
  },

  setAddress: function(){
    app.currentUser.set({address: $('#address-input')[0].value});
    app.currentUser.save();
    this.render();
  },

  resetType: function () {
    app.currentUser.set({type: null});
    app.currentUser.save();
    app.router.navigate('', true);
  }
});
