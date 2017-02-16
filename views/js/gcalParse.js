var calendarURL = 'https://www.googleapis.com/calendar/v3/calendars/sutd.app@gmail.com/events?key=AIzaSyBxIYzfHxIhawdppf8YeL_7PgIdY1g0evI';

fetch(calendarURL)
.then(res => res.text())
.then(jsonText => JSON.parse(jsonText))
.then(function(json) {
	var htmlString = "";

	for (var i in json.items) { //apparently (var i in json.items) does not return the item, but rather the index
		var event = {
			title: json.items[i].summary, //hence the need for json.items[i]
			description: json.items[i].description,
			location: json.items[i].location,
			start: new Date(json.items[i].start.dateTime),
			end: new Date(json.items[i].end.dateTime)
		};
		//extracted all the information into an 'event' item first, for no reason whatsoever, just seemed like a good idea

		//this way we can call event.<property> instead?
		htmlString+= "<p>";
		htmlString+= "Title: " + event.title + "<br>";
		htmlString+= "Description: " + event.description + "<br>";
		htmlString+= "Location: " + event.location + "<br>";
		htmlString+= "Event Date: " + event.start.toDateString() + "<br>";
		htmlString+= "Start Time: " + event.start.toLocaleTimeString() + "<br>";
		htmlString+= "End Time: " + event.end.toLocaleTimeString() + "<br>";
		htmlString+= "<br></p>";
	}

	document.getElementById("textbox").innerHTML = htmlString;
});