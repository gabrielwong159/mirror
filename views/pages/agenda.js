var agdDirectory = {

};

var agendaPage = new Page("agenda", agdInit, null, agdDirectory);

function agdInit() {
	loadAgenda();
}

function loadAgenda() {
  var dayta = new Date();
	var agdDate = dayta.getDate() + ' ' + dayta.getMonthName()+ ' ' + dayta.getFullYear();
  var htmlString = "<div id = agdHeader> Agenda <br />"+ agdDate + "</div>";
  htmlString += "<div id = agdTable><table id='agTable'><tr><th class='time'>Time</th><th class='event'>Event</th></tr>";
  //content
  htmlString += "<tr><th class='times' id='a1'></th><th class='events' id='a11'></th></tr>"
  htmlString += "<tr><th class='times' id='a2'></th><th class='events' id='a22'></th></tr>"
  htmlString += "<tr><th class='times' id='a3'></th><th class='events' id='a33'></th></tr>"
  htmlString += "<tr><th class='times' id='a4'></th><th class='events' id='a44'></th></tr>"
  htmlString += "<tr><th class='times' id='a5'></th><th class='events' id='a55'></th></tr>"
  htmlString += "<tr><th class='times' id='a6'></th><th class='events' id='a66'></th></tr>"
  htmlString += "<tr><th class='times' id='a7'></th><th class='events' id='a77'></th></tr>"
  htmlString += "<tr><th class='times' id='a8'></th><th class='events' id='a88'></th></tr>"
  //endcontent
  htmlString += "</tr></div>"
  $display.innerHTML = htmlString;
	agdDirectory[KEY_1] = mainPage.init.bind(mainPage);
	var calendarURL = 'https://www.googleapis.com/calendar/v3/calendars/sutd.app@gmail.com/events?key=AIzaSyBxIYzfHxIhawdppf8YeL_7PgIdY1g0evI';
	downloadInfo(calendarURL,dayta.getDate(),dayta.getMonth()+1,dayta.getFullYear());
}


function downloadInfo(calendarURL,dd,mm,yyyy){
	fetch(calendarURL)
	.then(res => res.text())
	.then(jsonText => JSON.parse(jsonText))
	.then(function(json) {
	var htmlString = [];
	var events = []
		for (var i in json.items) { //apparently (var i in json.items) does not return the item, but rather the index
			var event = {
				title: json.items[i].summary, //hence the need for json.items[i]
				description: json.items[i].description,
				location: json.items[i].location,
	      date: new Date(json.items[i].start.dateTime).toDateString(),
	      datetwo: new Date(json.items[i].start.dateTime).getDate(),
				startTime: new Date(json.items[i].start.dateTime).toLocaleTimeString(),
				endTime: new Date(json.items[i].end.dateTime).toLocaleTimeString()
			};
	    events.push(event)
			//extracted all the information into an 'event' item first, for no reason whatsoever, just seemed like a good idea
			//this way we can call event.<property> instead?
		}
		console.log(events);
	//CHECK IF CURRENT MONTH HAS ANY EVENTS
	/*for (var i=0;i<events.length;i++){
		console.log(events[i].date);
	}
	for (var i=0;i<events.length;i++)
		if (Date.parse(events[i].date).toString('M') == mm && Date.parse(events[i].date).toString('yyyy') == yyyy) {
			var parsedDate = Date.parse(events[i].date).toString('M')+'/'+Date.parse(events[i].date).toString('d')+'/'+Date.parse(events[i].date).toString('yyyy')
			console.log(parsedDate);
			document.getElementById('calendar1').contentWindow.document.getElementById(parsedDate).innerHTML += "<div class = timeSlot><div class = word>" + localeTimeStringConverter(events[i].startTime) + " to " + localeTimeStringConverter(events[i].endTime) + "</div></div>"
			document.getElementById('calendar1').contentWindow.document.getElementById(parsedDate).innerHTML += "<div class = titleSlot><div class = word>" + events[i].title + "</div></div>";
	}
	  //getDate gives DD*/
	})};
