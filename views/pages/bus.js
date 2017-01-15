<<<<<<< HEAD
var busPage = new Page("bus", busInit, busStop, busDirectory = defaultDirectory);
=======
var busPage = new Page("bus", busInit, busStop);
>>>>>>> origin/master
var id;

function busInit() {
	loadBus();
	id = setInterval(loadBus, 60000);
}

function busStop() {
	clearInterval(id);
}

function loadBus() {
	hideBox("info");
	hideBox("main");
	hideBox("motd");
	showBox("busdiv");
	var jsonString = retrieve(96049);
	var data = JSON.parse(jsonString);

	var wallpaper = "<img src= '/img/buswallpaper.png' class='buspaper'>";

	var outputString = "";
	outputString+= "<div class='bus'>";
	for (var bus in data.services) {
		outputString+= "<p id = bus" + data.services[bus].no + "container>";
		outputString+= + parseInt(data.services[bus].next.duration_ms/60000) + " minutes";
		outputString+= " <br /> and <br /> " + parseInt(data.services[bus].subsequent.duration_ms/60000) + " minutes</p>";
	}
	outputString+= "</div>";

	busdiv.innerHTML = wallpaper;
	busdiv.innerHTML += outputString;
}

function retrieve(busStop) {
	var request = new XMLHttpRequest();
	var path = 'https://arrivelah.herokuapp.com/?id=' + busStop;

	request.onreadystatechange = function() {
        if (request.readyState==4 && request.status==200) return request.responseText;
	}
    request.open("GET", path, false );
    request.send();

	return request.responseText;
}
