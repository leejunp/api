$(document).ready(function(){

  var statement = "select * from feed where url='https://na.leagueoflegends.com/en/rss.xml'";

  $.queryYQL(statement, "json", undefined, function (data) {

    var lolnews = data.query.results.item;

    for (var i = 0; i < lolnews.length; i++) {

      $("#lolnews").append(`
        <div id="wrapper">
          <div id="text">
            <h1 id="subtitle">${lolnews[i].title}</h1>
            <p id="body">${lolnews[i].description}</p>
          </div>
          <div id="shape"><h1 id="arrow">></h1></div>
        </div>

        `)

    }

  })

})

var map;
var infowindow;

function initMap() {
  infoWindow = new google.maps.InfoWindow;

  var yourloc = {lat: 40.7370, lng: -73.9925};

  map = new google.maps.Map(document.getElementById('map'), {
    center: yourloc,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: yourloc,
    radius: 500,
    type: ['convenience_store']
  }, callback);
}


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
