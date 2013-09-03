$(document).ready(function(){
  function generateMap() {
    var randomLat = (Math.random() * (90 - (-90)) + (-90));
    console.log(randomLat);
    var randomLng = (Math.random() * (180 - (-180)) + (-180));
    console.log(randomLng);

    var StreetViewPanoramaOptions = {
      visible: true,
      position: new google.maps.LatLng(randomLat, randomLng),
      addressControl: false
    };

    var streetViewService = new google.maps.StreetViewService();

    streetViewService.getPanoramaByLocation(StreetViewPanoramaOptions.position, 1000,
      function(StreetViewPanoramaData, StreetViewStatus){
        if (StreetViewStatus === google.maps.StreetViewStatus.OK) {
          StreetViewPanoramaOptions.position = StreetViewPanoramaData.location.latLng;
          var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false
          };
          var map = new google.maps.Map(document.getElementById("road-map"),
           mapOptions);

          setTimeout(function(){var streetMap = new google.maps.StreetViewPanorama(document.getElementById("street-map"), StreetViewPanoramaOptions);}, 1000);
        } else {
          console.log("no location!");
          generateMap();
        }
    });
  }
  generateMap();
});