document.getElementById("takeMap").addEventListener("click", getMap);

function getMap() {
  // Show map
  var maps = new google.maps.Map(document.getElementById('map3'), {
    zoom: 2,
    center: {lat: 0, lng: 0}
  });

  var geocoder = new google.maps.Geocoder();

  document.getElementById("get-distance-btn").addEventListener("click", function() {
    getAddress(geocoder, maps);
  });
}

// Phase2 function()
function getAddress(geocoder, resultsMap) {
	var address1 = document.getElementById("place1").value;
	var address2 = document.getElementById("place2").value;

	var point1 = {
		latitude: 0,
		longitude: 0
	}

	var point2 = {
		latitude: 0,
		longitude: 0
	}

	// get marker 1
	geocoder.geocode({'address': address1}, function(results, status) {
		if (status == 'OK') {
			resultsMap.setCenter(results[0].geometry.location);

			var marker1 = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location
			});

			point1.latitude = marker1.getPosition().lat();
			point1.longitude = marker1.getPosition().lng();

		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});

	// get marker 2
	geocoder.geocode({'address': address2}, function(results, status) {
		if (status == 'OK') {
			resultsMap.setCenter(results[0].geometry.location);

			var marker2 = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location
			});

			point2.latitude = marker2.getPosition().lat();
			point2.longitude = marker2.getPosition().lng();	
					
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}

		// Using geometry library to calculate distance between 2 marker
		var pointa = new google.maps.LatLng( point1.latitude, point1.longitude);
		var pointb = new google.maps.LatLng( point2.latitude, point2.longitude);
		var distance_in_meters = google.maps.geometry.spherical.computeDistanceBetween(pointa, pointb);

		document.getElementById("distance-number").innerHTML = "Distance: " + (distance_in_meters * 0.001).toFixed(2) + "km";
	});

}
