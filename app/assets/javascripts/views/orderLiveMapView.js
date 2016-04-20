var app = app || {};

app.OrderLiveMapView = Backbone.View.extend({
    el: '#main',

    render: function() {
        app.getCurrentUser(this);

        // set data for map

        var runnerAttributes = {email: "runner1@ga.co", address: "56 York st Sydney", name: "runner_1", id: 149, balance: "1000.0", latitude: -33.8732, longitude: 151.2066};
        var storeAttributes = {name:"metropole", latitude: -33.8717618, longitude: 151.2067029, id:152};
        var customerAttributes = {name: "customer_1", latitude: -33.8699165, longitude: 151.2062495, id: 146};

        $('#main').empty();

        var mapDiv = document.createElement('div');
         mapDiv.setAttribute('id', 'map');
         $('#main').append(mapDiv);

         ////should get access to direction features
         var directionsService = new google.maps.DirectionsService();
         var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

        var runnerlatlng = new google.maps.LatLng(runnerAttributes.latitude, runnerAttributes.longitude);
        var customerlatlng = new google.maps.LatLng(customerAttributes.latitude, customerAttributes.longitude);
        var storelatlng = new google.maps.LatLng(storeAttributes.latitude, storeAttributes.longitude);

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

        iconsURL = {store: 'assets/coffee.png', runner: 'assets/runner.png',customer: 'assets/finish.png', live: 'assets/footsteps.png'};

        //add the markers for the targets
        var addMarker = function(object, iconURL) {
            var marker = new google.maps.Marker({
                id: object.id,
                title: object.name,
                position: new google.maps.LatLng(object.latitude, object.longitude),
                cursor: 'pointer',
                flat: false,
                map: map,
                icon: new google.maps.MarkerImage(iconURL,
                                          new google.maps.Size(32, 35),
                                          new google.maps.Point(0, 0),
                                          new google.maps.Point(32 / 2, 35),
                                          new google.maps.Size(32, 35)),
             });
         };
        //add specific markers
        addMarker(runnerAttributes, iconsURL.runner);
        addMarker(customerAttributes, iconsURL.customer);
        addMarker(storeAttributes, iconsURL.store);

        //this adds the directions to the map
        directionsDisplay.setMap(map);

        var request = {
          origin: runnerlatlng,
          destination: customerlatlng,
          waypoints: [{location: storelatlng}],
          travelMode: google.maps.DirectionsTravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
          //Check if request is successful.
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response); //Display the directions result
          }
        });


        /// this is for live views of the runner
        if (app.currentUser.attributes.type === 'Customer') {

            var locationNum = 0;
            var runnerLiveLocation = [{'num': locationNum, 'longitude': runnerAttributes.longitude, 'latitude': runnerAttributes.latitude}];
            var runnerModel = app.runner.findWhere({'id': runnerAtributes.id});
            var runnerFetch = function() {
                runnerModel.fetch().done(function(){
                locationNum += 1;
                runnerLiveLocation.push({'num': locationNum, 'longitude': runnerModel.attributes.longitude, 'latitude': runnerModel.attributes.latitude});
                addMarker(runnerLiveLocation.pop(), iconsURL.live);
                });
            };

            var getRunnerLocation = window.setInterval(runnerFetch, 15000);
        }




      }


});
