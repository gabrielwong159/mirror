// bus page - function 2
var busPage = new Page("bus", busInit, busStop);
retrieveBus();
busPage.globals.reqInterval = setInterval(retrieveBus, 30 * 1000);

function busInit() {
	busPage.directory[KEY_1] = mainPage.init.bind(mainPage);

	setBusHTML();
	refreshPage();
	busPage.globals.refreshInterval = setInterval(refreshPage, 1000);
	loadSidebar("bus");
}

function busStop() {
	clearInterval(busPage.globals.loadInterval);
}

function retrieveBus() {
	var arrRequest = new XMLHttpRequest();
	var arrPath = "https://smart-mirror-news.azurewebsites.net/bus";
	arrRequest.onreadystatechange = function() {
		if (arrRequest.readyState==4 && arrRequest.status==200) busPage.globals.arr = JSON.parse(arrRequest.responseText);
	}
	arrRequest.open("GET", arrPath, true);
	arrRequest.send(null);

	var mapsRequest = new XMLHttpRequest();	
	var mapsPath = "https://smart-mirror-news.azurewebsites.net/maps";
	mapsRequest.onreadystatechange = function() {
		if (mapsRequest.readyState==4 && mapsRequest.status==200) busPage.globals.maps = JSON.parse(mapsRequest.responseText);
	}
	mapsRequest.open("GET", mapsPath, true);
	mapsRequest.send(null);
}

function refreshPage() {
	if (!(busPage.globals.arr && busPage.globals.maps)) return;

	clearInterval(busPage.globals.refreshInterval);
	loadBus();
	busPage.globals.loadInterval = setInterval(loadBus, 60 * 1000);
	$("#bus-loading").hide();
	$("#bus").show();
}

function loadBus(jsonString) {
	function parseTiming(time, status) {
		if (status == "In Operation") {
			time = Math.max(time, 0);
			if (time == 0) return "Arriving";
			else return time + (time>1 ? " minutes" : " minute");
		}
		else {
			return status == "Not In Operation" ? "Not Operating Now" : "No Est. Available";
		}
	}
	function getNext(bus) { return parseTiming(j[bus]["next"], j[bus]["status"]); }
	function getSubsequent(bus) { return parseTiming(j[bus]["subsequent"], j[bus]["status"]); }

	var j = busPage.globals.arr;
	var est = busPage.globals.maps;

	$("#bus-timings-2").html(
	`
		<h2>Bus 2</h2>
		<p>
			${getNext(2)}<br>
			and<br>
			${getSubsequent(2)}
		</p>
	`);
	$("#bus-timings-24").html(
	`
		<h2>Bus 24</h2>
		<p>
			${getNext(24)}<br>
			and<br>
			${getSubsequent(24)}
		</p>
	`);
	$("#bus-timings-5").html(
	`
		<h2>Bus 5</h2>
		<p>
			${getNext(5)}<br>
			and<br>
			${getSubsequent(5)}
		</p>
	`);
	$("#quick-route-simei").html(
	`
		<h2>Simei MRT</h2>
		<p>
			${parseTiming(est["simei"]+j[5]["next"], j[5]["status"])}<br>
			Bus 5 ${getNext(5).includes("minute") ? "in " : ""}${getNext(5)}<br>
			Alight in 4 stops
		</p>
	`
	);
	$("#quick-route-tanah").html(
	`
		<h2>Tanah Merah MRT</h2>
		<p>
			${parseTiming(est["tanah"]+j[24]["next"], j[24]["status"])}<br>
			Bus 24 ${getNext(24).includes("minute") ? "in " : ""}${getNext(24)}<br>
			Alight in 4 stops
		</p>
	`
	);
	$("#quick-route-simpang").html(
	`
		<h2>Simpang Bedok</h2>
		<p>
			${parseTiming(est["simpang"]+j[2]["next"], j[2]["status"])}<br>
			Bus 2 ${getNext(2).includes("minute") ? "in " : ""}${getNext(2)}<br>
			Alight in 6 stops
		</p>
	`
	);
}

function setBusHTML() {
	$display.innerHTML =
	`
	<div id="bus-loading">
		<img class="loading" src="/img/loading.gif">
	</div>
	<div id="bus">
		<div id="bus-image">
			<img src="/img/bus.png">
		</div>

		<div id="bus-label">
			<h1>Bus Stop 96049 (Opp Tropicana Condo)</h1>
		</div>

		<div class="container" id="bus-timings">
			<div id="bus-timings-2">
				<h2>Bus 2</h2>
				<p>
					-- minutes<br>
					and<br>
					-- minutes
				</p>
			</div>
			<div id="bus-timings-24">
				<h2>Bus 24</h2>
				<p>
					-- minutes<br>
					and<br>
					-- minutes
				</p>
			</div>
			<div id="bus-timings-5">
				<h2>Bus 5</h2>
				<p>
					-- minutes<br>
					and<br>
					-- minutes
				</p>
			</div>
		</div>

		<div id="quick-route-label">
			<h1>Quickest route to...</h1>
		</div>

		<div class="container" id="quick-route">
			<div id="quick-route-simei">
				<h2>Simei MRT</h2>
				<p>
					-- minutes<br>
					Bus 5 in -- minutes<br>
					Alight in 4 stops
				</p>
			</div>
			<div id="quick-route-tanah">
				<h2>Tanah Merah MRT</h2>
				<p>
					-- minutes<br>
					Bus 24 in -- minutes<br>
					Alight in 4 stops
				</p>
			</div>
			<div id="quick-route-simpang">
				<h2>Simpang Bedok</h2>
				<p>
					-- minutes<br>
					Bus 2 in -- minutes<br>
					Alight in 6 stops
				</p>
			</div>
		</div>

		<div id="train-image">
			<img src="/img/train.png">
		</div>

		<div class="container" id="last-train">
			<div id="last-train-jurong">
				<p>
					Last train to<br>
					Jurong East<br><br>
					Board at Tanah Merah by<br>
					23:31
				</p>
			</div>
			<div id="last-train-pasir-ris">
				<p>
					Last train to<br>
					Pasir Ris<br><br>
					Board at Tanah Merah by<br>
					00:31
				</p>
			</div>
			<div id="last-train-airport">
				<p>
					Last train to<br>
					Changi Airport<br><br>
					Board at Expo by<br>
					23:54
				</p>
			</div>
		</div>
	</div>
	`;
	$("#bus").hide();
}