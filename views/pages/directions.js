var dirDirectory = {

};

var dirPage = new Page("directions", dirInit, null, dirDirectory);

//printCanteen, idc, etc. have to be BEFORE dirInit->loadDirectory because of dirDirectory
function printCanteen() {
  var htmlString = "<p class = 'header'> SUTD Canteen. 2.201 </p>";
  var img = "<img src = '/img/canteen.png'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function printIDC() {
  var htmlString = "<p class = 'header'> IDC SUTD. 3.101 </p>";
  var img = "<img src = '/img/idc.png'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}
//end of page-specific functions

function dirInit() {
	loadDirectory();
}

function loadDirectory() {
  var htmlString = "<p class = 'header'> Welcome to SUTD. Which <br /> location would you like displayed? </p>";
  var img = "<img src = '/img/school.png'>";
  $display.innerHTML = htmlString;
  display.innerHTML += img;
	dirDirectory[KEY_1] = mainPage.init.bind(mainPage);
	dirDirectory[KEY_2] = printCanteen;
	dirDirectory[KEY_3] = printIDC;
}
