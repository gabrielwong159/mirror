var calDirectory = {

};

var calPage = new Page("calendar", calInit, null, calDirectory);

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

function loadCalendar() {
  var htmlString = "<p class = 'header'> Welcome to SUTD. Which <br /> location would you like displayed? </p>";
  var img = "<img src = '/img/school.png'>";
  $display.innerHTML = htmlString;
  display.innerHTML += img;
	calDirectory[KEY_1] = mainPage.init.bind(mainPage);
	calDirectory[KEY_2] = leftMonth;
	calDirectory[KEY_3] = rightMonth;
  calDirectory[KEY_4] = leftDay;
  calDirectory[KEY_5] = rightDay;
  calDirectory[KEY_6] = upDay;
  calDirectory[KEY_7] = downDay;
  calDirectory[KEY_8] = select;
}

//I HAVENT EDITED THIS PAGE YET. JUST USED DIRECTIONS.JS AS A TEMPLATE.
