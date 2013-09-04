$(document).ready(function(){
  function generateMap() {

    // Picking a random latitude & longitude
    var randomLat = (Math.random() * (90 - (-90)) + (-90));
    console.log(randomLat);
    var randomLng = (Math.random() * (180 - (-180)) + (-180));
    console.log(randomLng);

    // Setting up the Street View Map
    var StreetViewPanoramaOptions = {
      visible: true,
      position: new google.maps.LatLng(randomLat, randomLng),
      addressControl: false
    };

    // Setting a variable equal to returned Maps data
    var streetViewService = new google.maps.StreetViewService();

    // Looking for acceptable Street View locations within 1000m
    streetViewService.getPanoramaByLocation(StreetViewPanoramaOptions.position, 1000,
      function(StreetViewPanoramaData, StreetViewStatus){

        // If an acceptable Street View location is found...
        if (StreetViewStatus === google.maps.StreetViewStatus.OK) {

          // ...Assign its lat & long to the Street View Map
          StreetViewPanoramaOptions.position = StreetViewPanoramaData.location.latLng;

          // Setting up the World Map
          var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false
          };

          // Generating the World Map
          var map = new google.maps.Map(document.getElementById("road-map"),
           mapOptions);

          // Generating the Street View Map
          var streetMap = new google.maps.StreetViewPanorama(document.getElementById("street-map"), StreetViewPanoramaOptions);


          var markerOptions = {
            position: new google.maps.LatLng(0, 0),
            visible: true,
            draggable: true
          };

          var marker = new google.maps.Marker(markerOptions);
            marker.setMap(map);

          google.maps.event.addListener(marker, 'dragend', function(event){
            console.log('newLat: ' + event.latLng.lat() + ' newLng: ' + event.latLng.lng());
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

  // function addMyMarker() { //function that will add markers on button click
  //   var marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(48.89364, 2.33739),
  //     map: new google.maps.Map(document.getElementById("road-map"), mapOptions),
  //     draggable: true,
  //     animation: google.maps.Animation.DROP,
  //     title:"This a new marker!",
  //     icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
  //   });
  // }

});
