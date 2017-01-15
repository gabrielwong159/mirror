var dirDirectory = {

};

var dirPage = new Page("directions", dirInit, null, dirDirectory);

//printCanteen, idc, etc. have to be BEFORE dirInit->loadDirectory because of dirDirectory
function printCanteen() {
  var htmlString = "<p class = 'mapsheader'> SUTD Canteen. 2.201 <br /> Building 2, Level 2. </p>";
  var img = "<img src = '/img/canteen.png' class = 'maps'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function printIDC() {
  var htmlString = "<p class = 'mapsheader'> SUTD IDC. <br /> Building 3, Levels 1-3. </p>";
  var img = "<img src = '/img/idc.png' class = 'maps'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function printAudi() {
  var htmlString = "<p class = 'mapsheader'> SUTD IDC. <br /> Building 1, Levels 1-2. </p>";
  var img = "<img src = '/img/audi.png' class = 'maps'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function printFabLab() {
  var htmlString = "<p class = 'mapsheader'> SUTD Fabrication Lab. <br /> Building 5, Levels 1-2. </p>";
  var img = "<img src = '/img/fablab.png' class = 'maps'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}
//end of page-specific functions

function dirInit() {
	loadDirectory();
}

function loadDirectory() {
  var htmlString = "<p class = 'mapsheader'> Welcome to SUTD. Which <br /> location would you like displayed? </p>";
  var img = "<img src = '/img/school.png' class = 'maps'>";
  $display.innerHTML = htmlString;
  display.innerHTML += img;
	dirDirectory[KEY_1] = mainPage.init.bind(mainPage);
	dirDirectory[KEY_2] = printCanteen;
	dirDirectory[KEY_3] = printIDC;
  dirDirectory[KEY_4] = printAudi;
  dirDirectory[KEY_5] = printFabLab;
}
