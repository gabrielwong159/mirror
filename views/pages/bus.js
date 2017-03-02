// bus page - function 2

var busPage = new Page("bus", busInit, busStop);

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
		nextBus = parseInt(data.services[bus].next.duration_ms/60000);

		outputString+= "<p id = bus" + data.services[bus].no + "container>";
		outputString+=  nextBus>0 ? nextBus + " minutes" : "Arriving";
		outputString+= " <br /> and <br /> " + parseInt(data.services[bus].subsequent.duration_ms/60000) + " minutes</p>";
	}

	outputString+= "<p class='locationContainer' id='simeiContainer'>" + Math.max(parseInt(data.services[0].next.duration_ms/60000), 0) + "</p>";
	outputString+= "<p class='locationContainer' id='tanahContainer'>" + Math.max(parseInt(data.services[1].next.duration_ms/60000), 0) + "</p>";
	outputString+= "<p class='locationContainer' id='simpangContainer'>" + Math.max(parseInt(data.services[2].next.duration_ms/60000), 0) + "</p>";

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