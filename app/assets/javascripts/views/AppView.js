var app = app || {};

app.AppView = Backbone.View.extend({
      el: '#main',
      events: {
            'click #show-cafes-btn': 'showCafes'
      },

      render: function() {
        var appViewTemplate = $('#appViewTemplate').html();
        this.$el.html(appViewTemplate);

        console.log(app.stores);
      },

      showCafes: function(){
        app.router.navigate('stores', true);
      }


});
