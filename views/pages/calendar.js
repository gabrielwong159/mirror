var calDirectory = {
};
var calPage = new Page("calendar", calInit, null, calDirectory);
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
				startTime: new Date(json.items[i].start.dateTime).toLocaleTimeString(),
				endTime: new Date(json.items[i].end.dateTime).toLocaleTimeString()
			};
	    events.push(event)
			//extracted all the information into an 'event' item first, for no reason whatsoever, just seemed like a good idea
			//this way we can call event.<property> instead?
		}
  console.log(events);
  console.log(json.items);
  console.log(events[0].title);
  console.log(Date.parse(events[0].date).toString('MM')+'/'+Date.parse(events[0].date).toString('dd')+'/'+Date.parse(events[0].date).toString('yyyy'));
	console.log(events[1].date);
  console.log(events[1].startTime);
  console.log(events[1].endTime);
	console.log(localeTimeStringConverter(events[0].startTime))
	//CHECK IF CURRENT MONTH HAS ANY EVENTS
	for (var i=0;i<	events.length;i++)
		if (Date.parse(events[i].date).toString('M') == mm && Date.parse(events[i].date).toString('yyyy') == yyyy) {
			var parsedDate = Date.parse(events[i].date).toString('M')+'/'+Date.parse(events[i].date).toString('dd')+'/'+Date.parse(events[i].date).toString('yyyy')
			console.log(parsedDate);
			document.getElementById('calendar1').contentWindow.document.getElementById(parsedDate).innerHTML += events[i].title;
	}
	  //getDate gives DD
	});
}
//sub-button functions. have to be BEFORE calInit
function leftMonth(dd,mm,yyyy) {
  //goes to the previous month, eg. Feb -> Jan
	if (mm == 1){
		loadCalendar(dd,12,yyyy-1);
	}
	else {
		loadCalendar(dd,mm-1,yyyy);
	}
}


function rightMonth(dd,mm,yyyy) {
	if (mm == 12){
		loadCalendar(dd,1,yyyy+1);
	}
	else {
		loadCalendar(dd,mm+1,yyyy);
	}
}

function select() {
  //Selects date cursor is currently hovering over, enters DAY SCREEN
}
//end of page-specific functions

function calInit() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	loadCalendar(dd, mm, yyyy);
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

function loadCalendar(dd, mm, yyyy) {
  hideBox("info");
  hideBox("main");
  hideBox("motd");
  showBox("caldiv");

  console.log("Today is " + Date() + " and it is a " + Date.today().getDayName() + ".");
  var todaysDateString = mm+"."+dd+"."+yyyy;
  var monthsFirstDay = mm+"."+1+"."+yyyy;
  console.log("This month's first day lands on a " + Date.parse(monthsFirstDay).toString("dddd"));
  var monthsFirstDate = parseInt(Date.parse (monthsFirstDay).toString("d"));
  document.getElementById('calendar1').contentWindow.document.getElementById("monthAndYear").innerHTML = months[mm] + " " + yyyy;

  if (mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12)
  {
    var i = 0;
    for (i = 0; i < 31; i++) {
      var dateNo = 1+i;
			var slashString = Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('mm')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('dd')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('yyyy')
      var dateContainer = "<div class=dateNumber>"+dateNo+"</div><div id=day"+dateNo+">1WHY HELLO THERE DEBUGGING TEST LOTS OF CONTENT</div>";
      document.getElementById('calendar1').contentWindow.document.getElementById(monthsFirstDate+i).innerHTML = dateContainer;
    }
  }
  else if (mm == 4 || mm == 6 || mm == 9 || mm == 11)
  {
    var i = 0;
    for (i = 0; i < 30; i++) {
      var dateNo = 1+i;
			var slashString = Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('mm')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('dd')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('yyyy')
			var dateContainer = "<div class=dateNumber>"+dateNo+"</div><div id="+dateNo+">2WHY HELLO THERE DEBUGGING TEST LOTS OF CONTENT</div>";
      document.getElementById('calendar1').contentWindow.document.getElementById(monthsFirstDate+i).innerHTML = dateContainer;
    }
  }
  else if (yyyy%4==0 && yyyy%100!=0)
  {
    var i = 0;
    for (i = 0; i < 29; i++) {
      var dateNo = 1+i;
			var slashString = Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('mm')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('dd')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('yyyy')
			var dateContainer = "<div class=dateNumber>"+dateNo+"</div><div id=day"+dateNo+">YES</div>";
      document.getElementById('calendar1').contentWindow.document.getElementById(monthsFirstDate+i).innerHTML = dateContainer;
    }
  }
  else if (mm==2)
  {
    var i = 0;
    for (i = 0; i < 28; i++) {
      var dateNo = 1+i;
			var slashString = mm+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('dd')+'/'+Date.parse(mm+'/'+dateNo+'/'+yyyy).toString('yyyy')
			var dateContainer = "<div class=dateNumber>"+dateNo+"</div><div id="+slashString+"></div>";
      document.getElementById('calendar1').contentWindow.document.getElementById(monthsFirstDate+i).innerHTML = dateContainer;
    }
  }
	// Finding where to highlight by default, ie. today's date. Also stores today's dd, mm, yyyy.
  if (mm == today.getMonth()+1) {
		document.getElementById('calendar1').contentWindow.document.getElementById(mm+"/"+dd+"/"+yyyy).parentElement.parentElement.style.background = "rgba(111,111,111,0.5)";
	}
  //REMEMBER THE FORMAT IS MM/DD/YYYY. DARN AMERICANS.
  //1 to 31/30/28 date system finally SET UP! Edit id=day(DAYNUMBER>to edit individual cells' contents for your month.
  var dayBox = "day"+dd;
	var calendarURL = 'https://www.googleapis.com/calendar/v3/calendars/sutd.app@gmail.com/events?key=AIzaSyBxIYzfHxIhawdppf8YeL_7PgIdY1g0evI';
	updateCalendar(calendarURL, mm, yyyy);
  //caldiv.innerHTML = htmlString;
  //display.innerHTML += img;
  calDirectory[KEY_1] = mainPage.init.bind(mainPage);
  calDirectory[KEY_2] = leftMonth.bind(dd,mm,yyyy);
  calDirectory[KEY_3] = rightMonth.bind(dd,mm,yyyy);
  //calDirectory[KEY_4] = leftDay;
  //calDirectory[KEY_5] = rightDay;
  //calDirectory[KEY_6] = upDay;
  //calDirectory[KEY_7] = downDay;
  //calDirectory[KEY_8] = select;
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
