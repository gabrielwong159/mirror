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
  //content
  htmlString += "<div class='times' id='a1'></div><table><tr><th class='events' id='a11'></th><th class='locations' id='a111'></th></tr></table>"
  htmlString += "<div class='times' id='a2'></div><table><tr><th class='events' id='a22'></th><th class='locations' id='a222'></th></tr></table>"
  htmlString += "<div class='times' id='a3'></div><table><tr><th class='events' id='a33'></th><th class='locations' id='a333'></th></tr></table>"
  htmlString += "<div class='times' id='a4'></div><table><tr><th class='events' id='a44'></th><th class='locations' id='a444'></th></tr></table>"
  htmlString += "<div class='times' id='a5'></div><table><tr><th class='events' id='a55'></th><th class='locations' id='a555'></th></tr></table>"
  htmlString += "<div class='times' id='a6'></div><table><tr><th class='events' id='a66'></th><th class='locations' id='a666'></th></tr></table>"
  htmlString += "<div class='times' id='a7'></div><table><tr><th class='events' id='a77'></th><th class='locations' id='a777'></th></tr></table>"
  htmlString += "<div class='times' id='a8'></div><table><tr><th class='events' id='a88'></th><th class='locations' id='a888'></th></tr></table>"
  htmlString += "<div class='times' id='a9'></div><table><tr><th class='events' id='a99'></th><th class='locations' id='a999'></th></tr></table>"
  htmlString += "<div class='times' id='a10'></div><table><tr><th class='events' id='a1010'></th><th class='locations' id='a101010'></th></tr></table>"
	//endcontent

  htmlString += "</tr></div>"
  $display.innerHTML = htmlString;
	agdDirectory[KEY_1] = mainPage.init.bind(mainPage);
	var calendarURL = 'https://www.googleapis.com/calendar/v3/calendars/sutd.app@gmail.com/events?key=AIzaSyBxIYzfHxIhawdppf8YeL_7PgIdY1g0evI';
	updateAgenda(calendarURL);
}

function updateAgenda(calendarURL){
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
					startTime: new Date(json.items[i].start.dateTime).toString('h:mm tt'),
					endTime: new Date(json.items[i].end.dateTime).toString('h:mm tt'),
          order: new Date(json.items[i].start.dateTime).toString('HH.mm')
				};
		    events.push(event)
				//extracted all the information into an 'event' item first, for no reason whatsoever, just seemed like a good idea
				//this way we can call event.<property> instead?
			}
		var eventsList = {};
		for (var i in events) {
			var eventDay = events[i]['datetwo']+'.'+Date.parse(events[i]['date']).toString('M')+'.'+Date.parse(events[i]['date']).toString('yyyy');
			eventsList[eventDay] = [];
		}
		for (var i in events) {
			var eventDay = events[i]['datetwo']+'.'+Date.parse(events[i]['date']).toString('M')+'.'+Date.parse(events[i]['date']).toString('yyyy');
			tempy = {
				'Title' : events[i]['title'],
				'Venue' : events[i]['location'],
				'Start' : events[i]['startTime'],
				'End' : events[i]['endTime'],
        'TimeValue' : events[i]['order']
			}
			eventsList[eventDay].push(tempy);
		}
		console.log(eventsList);
		var toDate = new Date();
		for (var i in eventsList){
			console.log(i);
			console.log(eventsList[i]);
			console.log(toDate.toString('d'+'.'+'M'+'.'+'yyyy'))
			if(i == toDate.toString('d'+'.'+'M'+'.'+'yyyy')){
        var order = [];
        for (var k = 1; k < eventsList[i].length; k++){
          //PUT ORDERING FUNCTION HERE
          null
        }
				for (var j = 1; j < eventsList[i].length;j++){
          console.log(eventsList[i][j]['Start'].toString('h'));
					document.getElementById('a'+String(j)).innerHTML = eventsList[i][j]['Start'] + ' To ' + eventsList[i][j]['End'];
					document.getElementById('a'+String(j)+String(j)).innerHTML = eventsList[i][j]['Title'];
          if (eventsList[i][j]['Venue']) {
            document.getElementById('a'+String(j)+String(j)+String(j)).innerHTML = eventsList[i][j]['Venue'];
          }
				}
			}
		}
	})
}
