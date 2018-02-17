document.getElementById("get-location-btn").addEventListener("click",getLocation);

function getLocation() {
	map = new google.maps.Map(document.getElementById('map2'), {
		center: {lat: 0, lng: 0},
		zoom: 8
	});
	infoWindow = new google.maps.InfoWindow;

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('Your are here!');
			infoWindow.open(map);
			map.setCenter(pos);

			document.getElementById('device-location').innerHTML = "Latitude: " + pos.lat + "<br>Longitude: " + pos.lng;

		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		}, { 
			maximumAge: 3000, timeout: 5000, enableHighAccuracy: true 
		});
	} else {
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.getPosition(pos);
	infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}