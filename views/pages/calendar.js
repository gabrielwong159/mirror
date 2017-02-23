var calDirectory = {
};

var calPage = new Page("calendar", calInit, null, calDirectory);

//LOADING JSON DATA
var calendarURL = 'https://www.googleapis.com/calendar/v3/calendars/sutd.app@gmail.com/events?key=AIzaSyBxIYzfHxIhawdppf8YeL_7PgIdY1g0evI';

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
  console.log(events[0].date);
  console.log(events[0].datetwo);
  console.log(events[0].startTime);
  console.log(events[0].endTime);
  //getDate gives DD
});

//END LOADING JSON DATA
//sub-button functions. have to be BEFORE calInit
function leftMonth() {
  //goes to the previous month, eg. Feb -> Jan
  var htmlString = "<p class = 'header'> SUTD Canteen. 2.201 </p>";
  var img = "<img src = '/img/canteen.png'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function rightMonth() {
  //goes to the next month, eg. Feb -> Mar
  var htmlString = "<p class = 'header'> IDC SUTD. 3.101 </p>";
  var img = "<img src = '/img/idc.png'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function select() {
  //Selects date cursor is currently hovering over, enters DAY SCREEN
}
//end of page-specific functions

function calInit() {
	loadCalendar();
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

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

function loadCalendar(dd, mm, yyyy) {
  hideBox("info");
  hideBox("main");
  hideBox("motd");
  showBox("caldiv");
<<<<<<< HEAD

//THIS DEFINES OUR CALENDAR
=======
>>>>>>> 2b9192956f8bfa1c94c877ea526c67c38559f1ac
  var dateJS = Date.parse('1/1/2017');
  console.log("getDay returns:" + dateJS.getDay());
  console.log("Today is " + Date() + " and it is a " + Date.today().getDayName() + ".");
  // Finding where to highlight by default, ie. today's date. Also stores today's dd, mm, yyyy.
    //document.getElementById(dd).style.color = "blue";
  //REMEMBER THE FORMAT IS MM/DD/YYYY. DARN AMERICANS.
  var todaysDateString = mm+"."+dd+"."+yyyy;
  var monthsFirstDay = mm+"."+1+"."+yyyy;
  console.log("This month's first day lands on a " + Date.parse(monthsFirstDay).toString("dddd"));
  var monthsFirstDate = parseInt(Date.parse (monthsFirstDay).toString("d"));
  document.getElementById('calendar1').contentWindow.document.getElementById("monthAndYear").innerHTML = months[mm] + " " + yyyy;
<<<<<<< HEAD
  console.log(mm);
  //this defines my calendar date system
=======
>>>>>>> 2b9192956f8bfa1c94c877ea526c67c38559f1ac
  if (mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12)
  {
    var i = 0;
    for (i = 0; i < 31; i++) {
      var dateNo = 1+i;
      var dateContainer = "<div class=dateNumber>"+dateNo+"</div><div id=day"+dateNo+">1WHY HELLO THERE DEBUGGING TEST LOTS OF CONTENT</div>";
      document.getElementById('calendar1').contentWindow.document.getElementById(monthsFirstDate+i).innerHTML = dateContainer;
    }
  }
  else if (mm == 4 || mm == 6 || mm == 9 || mm == 11)
  {
    var i = 0;
    for (i = 0; i < 30; i++) {
      var dateNo = 1+i;
      var dateContainer = "<div class=dateNumber>"+dateNo+"</div><div id=day"+dateNo+">2WHY HELLO THERE DEBUGGING TEST LOTS OF CONTENT</div>";
      document.getElementById('calendar1').contentWindow.document.getElementById(monthsFirstDate+i).innerHTML = dateContainer;
    }
  }
  else if (yyyy%4==0 && yyyy%100!=0)
  {
    var i = 0;
    for (i = 0; i < 29; i++) {
      var dateNo = 1+i;
      var dateContainer = "<div class=dateNumber>"+dateNo+"</div><div id=day"+dateNo+">"+event[dateNo]+"</div>";
      document.getElementById('calendar1').contentWindow.document.getElementById(monthsFirstDate+i).innerHTML = dateContainer;
    }
  }
  else
  {
    var i = 0;
    for (i = 0; i < 28; i++) {
      var dateNo = 1+i;
      var dateContainer = "<div class=dateNumber>"+dateNo+"</div><div id=day"+dateNo+">"+event[dateNo]+"</div>";
      document.getElementById('calendar1').contentWindow.document.getElementById(monthsFirstDate+i).innerHTML = dateContainer;
    }
  }
  //1 to 31/30/28 date system finally SET UP! Edit id=day(DAYNUMBER>to edit individual cells' contents for your month.
  var dayBox = "day"+dd;
  document.getElementById('calendar1').contentWindow.document.getElementById(dayBox).parentElement.parentElement.style.background = "rgba(111,111,111,0.5)";
  //THIS STUFF PROCESSES MY EVENTS FROM MY GOOGLE CALENDAR, RETURNS IN JSON
  /*var scriptString = new XMLHttpRequest();
     scriptString.open('GET', 'https://www.googleapis.com/calendar/v3/calendars/sutd.app@gmail.com/events?key=AIzaSyBxIYzfHxIhawdppf8YeL_7PgIdY1g0evI');
     scriptString.onload = function() {
       console.log(scriptString.responseText);
       var calData = jQuery.parseJSON(scriptString.responseText);
       var calHtml=''

<<<<<<< HEAD
       for (var obj in calData.items) {
         caldiv.innerHTML = calData.items[obj].description;
         caldiv[INTEGERPARSEDATE(calData.items.[obj].DATE)].innerHTML;
       }
     };
   scriptString.send();
   */
   //END OF JSON FEED


   //var dateJS = Date.parse('MONTH/DAY/YEAR');
   //caldiv.innerHTML = ''

=======
>>>>>>> 2b9192956f8bfa1c94c877ea526c67c38559f1ac
  //caldiv.innerHTML = htmlString;
  //display.innerHTML += img;
  calDirectory[KEY_1] = mainPage.init.bind(mainPage);
  calDirectory[KEY_2] = leftMonth;
  calDirectory[KEY_3] = rightMonth;
  //calDirectory[KEY_4] = leftDay;
  //calDirectory[KEY_5] = rightDay;
  //calDirectory[KEY_6] = upDay;
  //calDirectory[KEY_7] = downDay;
  //calDirectory[KEY_8] = select;
}



//I HAVENT EDITED THIS PAGE YET. JUST USED DIRECTIONS.JS AS A TEMPLATE.

//SAMPLE AJAX CODE FOR FUTURE REFERENCE
/*  var scriptString = new XMLHttpRequest();
    scriptString.open('GET', 'htmlString');
    scriptString.onload = function() {
      console.log(scriptString.responseText);
      caldiv.innerHTML = scriptString.responseText;
    };
  scriptString.send();
*/
