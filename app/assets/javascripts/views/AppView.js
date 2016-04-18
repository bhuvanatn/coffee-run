var app = app || {};

app.AppView = Backbone.View.extend({
      el: '#main',
      events: {
            'click show-cafes-btn': 'showCafes'
      },

      render: function() {
        var appViewTemplate = $('#appViewTemplate').html();
        this.$el.html(appViewTemplate);
        app.stores.fetch().done( function() {
             console.log(app.Users.toJSON());
        });
      },

      showCafes: function(){

      }


});
