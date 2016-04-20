var app = app || {};

app.OrderLiveMapView = Backbone.View.extend({
    el: '#main',

    render: function() {
        app.getCurrentUser(this);

        // set data for map

        var runnerAttributes = {email: "runner1@ga.co", address: "56 York st Sydney", name: "runner_1", id: 149, balance: "1000.0", latitude: -33.8698442, longitude: 151.2061558};
        var storeAttributes = {name:"metropole", latitude: -33.8717618, longitude: 151.2067029, id:152};
        var customerAttributes = {name: "customer_1", latitude: -33.8699165, longitude: 151.2062495, id: 146};
        var userAttributes = '';
        var targetAttributes = '';
        if (app.currentUser.attributes.type === 'Runner') {
            userAttributes = runnerAttributes;
            targetAttributes = customerAttributes;
        }
        if (app.currentUser.attributes.type === 'Customer') {
            userAttributes = customerAttributes;
            targetAttributes = runnerAttributes;
            var runnerLiveLocation = [];
            var runnerModel
        }

        $('#main').empty();

        var mapDiv = document.createElement('div');
         mapDiv.setAttribute('id', 'map');
         $('#main').append(mapDiv);

         ////should get access to direction features
         var directionsService = new google.maps.DirectionsService();
         var directionsDisplay = new google.maps.DirectionsRenderer();

        var userlatlng = new google.maps.LatLng(userAttributes.latitude, userAttributes.longitude);
        var targetlatlng = new google.maps.LatLng(targetAttributes.latitude, targetAttributes.longitude);
        var storelatlng = new google.maps.LatLng(storeAttribtues.latitude, storeAttributes.longitude);

        var mapOptions = {
            center: storelatlng,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false
          };

        // create map
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        //loop through targets to add markers for each
        var markerLabels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W'];

        //add the markers for the targets
        var addMarker = function(object) {
            var marker = new google.maps.Marker({
                id: object.id,
                title: object.name,
                position: new google.maps.LatLng(object.latitude, object.longitude),
                cursor: 'pointer',
                flat: false,
                map: map
                // icon: new google.maps.MarkerImage('/assets/coffee.png',
                //                           new google.maps.Size(32, 35),
                //                           new google.maps.Point(0, 0),
                //                           new google.maps.Point(32 / 2, 35),
                //                           new google.maps.Size(32, 35)),
             });
            //  google.maps.event.addListener(marker, 'click', function() {
            //        window.location.href = marker.url;
            //  });
         };

        addMarker(targetAttributes);
        addMarker(userAttributes);
        addMarker(storeAttributes);

        directionsDisplay.setMap(map);

        var request = {
          origin: userlatlng,
          destination: targetlatlng,
          waypoints: [{location: storelatlng}],
          travelMode: google.maps.DirectionsTravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
          //Check if request is successful.
          if (status == google.maps.DirectionsStatus.OK) {
            console.log(status);
            directionsDisplay.setDirections(response); //Display the directions result
          }
        });




      }


});
