var app = app || {};

app.CustomerView = Backbone.View.extend({
  el: '#main',
  events: {
    'click #show-cafes-btn': 'showCafes'
  },

  render: function() {
    var customerViewTemplate = $('#customerViewTemplate').html();
    this.$el.html(customerViewTemplate);
  },

  showCafes: function(){
    app.router.navigate('stores', true);
  }
});
