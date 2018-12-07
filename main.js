$(document).ready(function(){

  var statement = "select * from feed where url='https://na.leagueoflegends.com/en/rss.xml'";

  $.queryYQL(statement, "json", undefined, function (data) {

    var lolnews = data.query.results.item;

    for (var i = 0; i < lolnews.length; i++) {

      var classname = "";
      var classnametwo = "";
      var classnamethree = "";
      var idname = "";

      if(i > 6){
        classname = "quartersize"
        classnametwo = "fitquarter"
        classnamethree = "begone"
      }

      if(i <= 6){
        idname="wrapper"
      }


      $("#lolnews").append(`
        <a href="${lolnews[i].link}">
          <div id="${idname}" class="${classname}">
            <div id="text" class="${classnametwo}">
              <h1 id="subtitle">${lolnews[i].title}</h1>
              <p id="body">${lolnews[i].description}</p>
            </div>
            <div id="shape" class="${classnamethree}"><h1 id="arrow">></h1></div>
          </div>
        </a>

        `)

    }

  })

})

var map;
var infowindow;

function initMap() {
  infoWindow = new google.maps.InfoWindow;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          var yourloc = {lat: position.coords.latitude, lng: position.coords.longitude};

          map = new google.maps.Map(document.getElementById('map'), {
            center: yourloc,
            zoom: 15,
            styles: [{
                  "featureType": "all",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "all",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 13
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#000000"
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#144b53"
                      },
                      {
                          "lightness": 14
                      },
                      {
                          "weight": 1.4
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#08304b"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#0c4152"
                      },
                      {
                          "lightness": 5
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#000000"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#0b434f"
                      },
                      {
                          "lightness": 25
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#000000"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#0b3d51"
                      },
                      {
                          "lightness": 16
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#000000"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#146474"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#021019"
                      }
                  ]
              }
          ]
          });

          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: yourloc,
            radius: 500,
            type: ['convenience_store']
          }, callback);

          infoWindow.setPosition(pos);
          infoWindow.setContent('You are Here');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

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



$("button").click(function() {
    $('html,body').animate({
        scrollTop: $("#map").offset().top},
        'slow');
});
