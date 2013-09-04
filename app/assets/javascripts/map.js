$(document).ready(function(){
  var mapVariables = {};

  function generateMap() {

    // Picking a random latitude & longitude
    var randomLat = (Math.random() * (90 - (-90)) + (-90));
    console.log(randomLat);
    var randomLng = (Math.random() * (180 - (-180)) + (-180));
    console.log(randomLng);

    // Setting up the Street View Map
    mapVariables.StreetViewPanoramaOptions = {
      visible: true,
      position: new google.maps.LatLng(randomLat, randomLng),
      addressControl: false,
      linksControl: true,
      panControl: true
    };

    // Setting a variable equal to returned Maps data
    var streetViewService = new google.maps.StreetViewService();

    // Looking for acceptable Street View locations within 1000m
    streetViewService.getPanoramaByLocation(mapVariables.StreetViewPanoramaOptions.position, 1000,
      function(StreetViewPanoramaData, StreetViewStatus){

        // If an acceptable Street View location is found...
        if (StreetViewStatus === google.maps.StreetViewStatus.OK) {

          // ...Assign its lat & long to the Street View Map
          mapVariables.StreetViewPanoramaOptions.position = StreetViewPanoramaData.location.latLng;

          // Setting up the World Map
          var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false
          };

          // Generating the World Map
          mapVariables.map = new google.maps.Map(document.getElementById("road-map"),
           mapOptions);

          // Generating the Street View Map
          var streetMap = new google.maps.StreetViewPanorama(document.getElementById("street-map"), mapVariables.StreetViewPanoramaOptions);

          var markerOptions = {
            position: new google.maps.LatLng(0, 0),
            visible: true,
            draggable: true,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'

          };

          var marker = new google.maps.Marker(markerOptions);
            marker.setMap(mapVariables.map);

          google.maps.event.addListener(marker, 'dragend', function(event){
            console.log('newLat: ' + event.latLng.lat() + ' newLng: ' + event.latLng.lng());
            mapVariables.markerLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
            mapVariables.distanceBtwn = Math.round(google.maps.geometry.spherical.computeDistanceBetween(mapVariables.StreetViewPanoramaOptions.position, mapVariables.markerLatLng) * 0.000621371);
          });

          // If no acceptable Street View Location is found...
        } else {
          console.log("no location!");

          // ...Re-run the function
          generateMap();
        }
    });
  }
  generateMap();

  $('#guess-button').click(function() {
    var rightMarkerOptions = {
      position: mapVariables.StreetViewPanoramaOptions.position,
      visible: true,
      draggable: false,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    };

    var rightMarker = new google.maps.Marker(rightMarkerOptions);
      rightMarker.setMap(mapVariables.map);

    var line = new google.maps.Polyline({
      path: [mapVariables.StreetViewPanoramaOptions.position, mapVariables.markerLatLng],
      strokeColor: "#000000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      geodesic: false,
      map: mapVariables.map
    });

    $('#guess-box').append("You were off by " + mapVariables.distanceBtwn + " miles!");
  });
});