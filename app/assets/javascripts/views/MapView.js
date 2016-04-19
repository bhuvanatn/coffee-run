var app = app || {};

app.MapView = Backbone.View.extend({
    el: '#main',

    render: function(userObject, targetObject) {
      // set data for map

      var latlng = new google.maps.LatLng(userObject.latitude, userObject.longitude);
    
      var mapOptions = {
          center: latlng,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false
        };

      // create map
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);

      //loop through targets to add markers for each
      var markerLabels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W'];


      //add the markers for the targets
      var addTargetMarker = function(object, label) {
          var marker = new google.maps.Marker({
              id: object.id,
              title: object.name,
              position: new google.maps.LatLng(object.latitude, object.longitude),
              cursor: 'pointer',
              flat: false,
              map: map,
              label: label,
              url: '#menu/' + object.id,
              icon: new google.maps.MarkerImage('/assets/coffee.png',
                                        new google.maps.Size(32, 35),
                                        new google.maps.Point(0, 0),
                                        new google.maps.Point(32 / 2, 35),
                                        new google.maps.Size(32, 35)),
           });
           google.maps.event.addListener(marker, 'click', function() {
                 window.location.href = marker.url;
           });
       };

       var targets = targetObject.models;

       for (var i = 0; i < targets.length; i++) {
           var result = targets[i].attributes;
           var label = markerLabels[i];
           addTargetMarker(result, label);
       }

       // add your location
       var addDestinationMarker = function(object) {
           var marker = new google.maps.Marker({
               id: object.id,
               title: object.name,
               position: new google.maps.LatLng(object.latitude, object.longitude),
               cursor: 'pointer',
               flat: false,
               label: object.name,
               map: map,
            });
        };


       addDestinationMarker(userObject);  //for the user home location
    }

});
