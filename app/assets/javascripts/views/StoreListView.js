var app = app || {};

app.StoreListView = Backbone.View.extend({
    el: '#main',
    events: {
    'click .store': 'showMenu',
    'click #toggleListBtn': 'showListView',
    'click #toggleMapBtn': 'showMapView'
    },
    render: function() {
      // prepare main div

      $('#main').empty();

      //render main div
    var toggleListDiv = document.createElement('button');
         toggleListDiv.setAttribute('id', 'toggleListBtn');
         toggleListDiv.setAttribute('class', 'toggleBtn');
         $('#main').append(toggleListDiv);
         $('#toggleListBtn').html('List View');

     var toggleMapDiv = document.createElement('button');
        toggleMapDiv.setAttribute('id', 'toggleMapBtn');
        toggleMapDiv.setAttribute('class', 'toggleBtn');
        $('#main').append(toggleMapDiv);
        $('#toggleMapBtn').html('Map View');

      //render list div
      var addListViewDiv = document.createElement('div');
           addListViewDiv.setAttribute('id', 'list-view');
           addListViewDiv.setAttribute('class', 'hide');
           $('#main').append(addListViewDiv);

      var storeListViewTemplate = $('#StoreListViewTemplate').html();
      $('#list-view').html(storeListViewTemplate);

      var storeViewTemplate = $('#StoreViewTemplate').html();
      var storeViewHTML = _.template(storeViewTemplate);

      for (var i = 0; i < app.stores.length; i++) {
            var store = app.stores.models[i].attributes;
            var storeElement = storeViewHTML(store);
            $('#store-list').append(storeElement);
      }

      //render map div
      var addMapViewDiv = document.createElement('div');
           addMapViewDiv.setAttribute('id', 'map-view');
          //  addMapViewDiv.setAttribute('class', 'hide');
           $('#main').append(addMapViewDiv);


           app.stores.fetch().done(function(){
              var mapDiv = document.createElement('div');
              mapDiv.setAttribute('id', 'map');
              $('#map-view').append(mapDiv);
              var storeMap = new app.MapView();
              storeMap.render(app.currentUser.attributes, app.stores.models);
           });
  },
  showMenu: function(e) {
       app.router.navigate('menu/' + e.currentTarget.id, true);
  },
  showListView: function() {
      $('#list-view').removeClass('hide');
      $('#map-view').addClass('hide');
  },
  showMapView: function() {
    $('#list-view').addClass('hide');
    $('#map-view').removeClass('hide');
  }

});
