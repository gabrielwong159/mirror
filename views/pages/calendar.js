var calPage = new Page("calendar", calInit, null);
var calendarURL = 'https://www.googleapis.com/calendar/v3/calendars/sutd.app@gmail.com/events?key=AIzaSyBxIYzfHxIhawdppf8YeL_7PgIdY1g0evI';

function localeTimeStringConverter(string) {
	var returnvar = Date.parse(string).toString('h')+':'+ Date.parse(string).toString('mm') + ' ' + string[string.length-2] + string[string.length-1]
	return returnvar
}

function updateCalendar(calendarURL,mm,yyyy){
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
	//CHECK IF CURRENT MONTH HAS ANY EVENTS
	for (var i=0;i<events.length;i++){
		console.log(events[i].date);
	}
	for (var i=0;i<events.length;i++)
		if (Date.parse(events[i].date).toString('M') == mm && Date.parse(events[i].date).toString('yyyy') == yyyy) {
			var parsedDate = Date.parse(events[i].date).toString('M')+'/'+Date.parse(events[i].date).toString('d')+'/'+Date.parse(events[i].date).toString('yyyy')
			console.log(parsedDate);
			document.getElementById('calendar1').contentWindow.document.getElementById(parsedDate).innerHTML += "<div class = timeSlot><div class = word>" + events[i].startTime + " to " + events[i].endTime + "</div></div>"
			document.getElementById('calendar1').contentWindow.document.getElementById(parsedDate).innerHTML += "<div class = titleSlot><div class = word>" + events[i].title + "</div></div>";
	}
	  //getDate gives DD
	});
}
//sub-button functions. have to be BEFORE calInit

function select() {
  //Selects date cursor is currently hovering over, enters DAY SCREEN
}
//end of page-specific functions

function calInit() {
	calPage.directory[KEY_1] = mainPage.init.bind(mainPage);
	calPage.directory[KEY_2] = leftMonth(null,dd,mm,yyyy);
	calPage.directory[KEY_3] = rightMonth(null,dd,mm,yyyy);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	loadCalendar(dd, mm, yyyy);

	//calPage.directory[KEY_4] = leftDay;
	//calPage.directory[KEY_5] = rightDay;
	//calPage.directory[KEY_6] = upDay;
	//calPage.directory[KEY_7] = downDay;
	//calPage.directory[KEY_8] = select;

}

var months = {
	'1' : 'January',
	'2' : 'February',
	'3' : 'March',
	'4' : 'April',
	'5' : 'May',
	'6' : 'June',
	'7' : 'July',
	'8' : 'August',
	'9' : 'September',
	'10': 'October',
	'11': 'November',
	'12': 'December',
}
var days = {
	'1' : 'Monday',
	'2' : 'Tuesday',
	'3' : 'Wednesday',
	'4' : 'Thursday',
	'5' : 'Friday',
	'6' : 'Saturday',
	'0' : 'Sunday',
}

var dayW = {
    'Monday' : '1',
	'Tuesday' : '2',
	'Wednesday' : '3',
	'Thursday' : '4',
	'Friday' : '5',
	'Saturday': '6',
	'Sunday' : '0'
}

function loadCalendar(dd, mm, yyyy) {
	console.log("HELLO CAN I HAVE YOUR ATTENTION");
	console.log(dd);
	//hideBox("info");
	hideBox("main");
	hideBox("motd");
	showBox("caldiv");

	var todaysDateString = mm+"."+dd+"."+yyyy;
	var monthsFirstDay = mm+"."+1+"."+yyyy;
	// console.log(monthsFirstDay);
	// console.log("This month's first day lands on a " + Date.parse(monthsFirstDay).toString("dddd"));
	var monthsFirstDate = Date.parse(monthsFirstDay).toString("dddd");
	document.getElementById('calendar1').contentWindow.document.getElementById("monthAndYear").innerHTML = months[mm] + " " + yyyy;

	for (i=1; i<43;i++) {
		document.getElementById('calendar1').contentWindow.document.getElementById(i).innerHTML = ' '
		document.getElementById('calendar1').contentWindow.document.getElementById(i).parentElement.style.background = "transparent";
	}

	if (mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12) {
		for (var i=0; i<31; i++) {
			var dateNo = 1+i;
			var slashString = mm+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('d')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('yyyy')
			var dateContainer = "<div class=dateNumber><span><div class=dateWord>"+dateNo+"</div></span></div><div id="+slashString+"></div>";
		  	document.getElementById('calendar1').contentWindow.document.getElementById(parseInt(dayW[monthsFirstDate])+i+1).innerHTML = dateContainer;
		}
	}
	else if (mm == 4 || mm == 6 || mm == 9 || mm == 11) {
	    for (var i=0; i<30; i++) {
				var dateNo = 1+i;
				var slashString = mm+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('d')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('yyyy')
				var dateContainer = "<div class=dateNumber><span><div class=dateWord>"+dateNo+"</div></span></div><div id="+slashString+"></div>";
	      document.getElementById('calendar1').contentWindow.document.getElementById(parseInt(dayW[monthsFirstDate])+i+1).innerHTML = dateContainer;
	    }
  	}
	else if (yyyy%4==0 && yyyy%100!=0) {
	    for (var i=0; i<29; i++) {
			var dateNo = 1+i;
			var slashString = mm+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('d')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('yyyy')
			var dateContainer = "<div class=dateNumber><div class=dateWord>"+dateNo+"</div></div><div id="+slashString+"></div>";
	     	document.getElementById('calendar1').contentWindow.document.getElementById(parseInt(dayW[monthsFirstDate])+i+1).innerHTML = dateContainer;
	    }
  	}
	else if (mm==2) {
		for (var i=0; i<28; i++) {
			var dateNo = 1+i;
			var slashString = mm+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('d')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('yyyy')
			var dateContainer = "<div class=dateNumber><div class=dateWord>"+dateNo+"</div></div><div id="+slashString+"></div>";
		  	document.getElementById('calendar1').contentWindow.document.getElementById(parseInt(dayW[monthsFirstDate])+i+1).innerHTML = dateContainer;
		}
	}
	// Finding where to highlight by default, ie. today's date. Also stores today's dd, mm, yyyy.
	console.log(mm+"/"+dd+"/"+yyyy);
	var todayMonth = new Date();
	if (mm == todayMonth.getMonth()+1 && yyyy==todayMonth.getFullYear()) {
		document.getElementById('calendar1').contentWindow.document.getElementById(mm+"/"+dd+"/"+yyyy).parentElement.parentElement.style.background = "rgba(111,111,111,0.5)";
	}
	//REMEMBER THE FORMAT IS MM/DD/YYYY. DARN AMERICANS.
	//1 to 31/30/28 date system finally SET UP! Edit id=day(DAYNUMBER>to edit individual cells' contents for your month.
	updateCalendar(calendarURL, mm, yyyy);
}

	function leftMonth(day,month,year) {
		console.log("HELLO CAN I HAVE YOUR ATTENTION2");
		//goes to the previous month, eg. Feb -> Jan
		if (month == 1){
			loadCalendar(day,12,year-1);
		}
		else {
			loadCalendar(day,month-1,year);
		}
	}

	function rightMonth(dd,mm,yyyy) {
		console.log("HELLO CAN I HAVE YOUR ATTENTION3");
		if (mm == 12){
			loadCalendar(dd,1,yyyy+1);
		}
		else {
			loadCalendar(dd,mm+1,yyyy);
		}
}

//SAMPLE AJAX CODE FOR FUTURE REFERENCE
/*  var scriptString = new XMLHttpRequest();
    scriptString.open('GET', 'htmlString');
    scriptString.onload = function() {
      console.log(scriptString.responseText);
      caldiv.innerHTML = scriptString.responseText;
    };
  scriptString.send();
*/
