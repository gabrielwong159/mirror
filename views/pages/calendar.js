var calDirectory = {

};

var calPage = new Page("calendar", calInit, null, calDirectory);

//sub-button functions. have to be BEFORE calInit
function leftMonth() {
  var htmlString = "<p class = 'header'> SUTD Canteen. 2.201 </p>";
  var img = "<img src = '/img/canteen.png'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function rightMonth() {
  var htmlString = "<p class = 'header'> IDC SUTD. 3.101 </p>";
  var img = "<img src = '/img/idc.png'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}
//end of page-specific functions

function calInit() {
	loadCalendar();
}

function loadCalendar() {
  var htmlString = "<p class = 'header'> Welcome to SUTD. Which <br /> location would you like displayed? </p>";
  var img = "<img src = '/img/school.png'>";
  $display.innerHTML = htmlString;
  display.innerHTML += img;
	calDirectory[KEY_1] = mainPage.init.bind(mainPage);
	calDirectory[KEY_2] = leftMonth;
	calDirectory[KEY_3] = rightMonth;
}

//I HAVENT EDITED THIS PAGE YET. JUST USED DIRECTIONS.JS AS A TEMPLATE.
