var map;
var marker;
var infowindow;
var messagewindow;
// var infoPersonal = "<div><table><tr><td>Name:</td><td><input type='text' id='name'/></td></tr><tr><td>Address:</td><td><input type='text' id='address'/></td></tr><tr><td>Content:</td><td><input type='text' id='content'/></td></tr><tr><td></td><td><input type='button' onclick='saveData()' value='Save'/></td></tr></table></div>";

function initMap() {
	// get map
	var Oulu = {lat: 65.01236, lng: 25.46816};
	map = new google.maps.Map(document.getElementById('map4'), {
		center: Oulu,
		zoom: 13
	});

	// infowindow
	infowindow = new google.maps.InfoWindow({
		content: document.getElementById('form')
	});

	messagewindow = new google.maps.InfoWindow({
		content: "Location saved!"
	});

	// click map event
	google.maps.event.addListener(map, 'click', function(event) {
		marker = new google.maps.Marker({
			position: event.latLng,
			map: map
		});

		// click marker event
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	});
}

// save data from infowindow
function saveData() {
	var name = escape(document.getElementById('name').value);
	var address = escape(document.getElementById('address').value);
	var content = escape(document.getElementById('content').value);
	var latlng = marker.getPosition();
	var url = "http://www.students.oamk.fi/~t6ngdu00/phpsqlinfo_addrow.php?name=" + name + 
				"&address=" + address + 
				"&lat=" + latlng.lat() + 
				"&lng=" + latlng.lng() + 
				"&content=" + content;

	downloadUrl(url, function(data, responseCode) {
		if (responseCode == 200 && data.length >= 1) {
			infowindow.close();
			messagewindow.open(map, marker);
		}
	});
}

function downloadUrl(url, callback) {
	// If request is true => ActiveXObject('Microsoft.XMLHTTP'). Otherwise XMLHttpRequest
	var request = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			request.onreadystatechange = doNothing;
			callback(request.responseText, request.status);
		}
	};

	request.open('GET', url, true);
	request.send(null);	
}

function doNothing() {
}

