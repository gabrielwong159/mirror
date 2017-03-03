var dirDirectory = {

};

var dirPage = new Page("directions", dirInit, null, dirDirectory);

//printCanteen, idc, etc. have to be BEFORE dirInit->loadDirectory because of dirDirectory
function printCanteen() {
  var htmlString = "<p class = 'mapsheader'> SUTD Canteen. 2.201 <br /> Building 2, Level 2 </p>";
  var img = "<img src = '/img/canteen.png' class = 'maps'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function printIDC() {
  var htmlString = "<p class = 'mapsheader'> SUTD IDC. <br /> Building 3, Levels 1-3 </p>";
  var img = "<img src = '/img/idc.png' class = 'maps'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function printAHLT() {
  var htmlString = "<p class = 'mapsheader'> Albert Hong Lecture Theater <br /> Building 1, Level 1 </p>";
  var img = "<img src = '/img/AHLT.png' class = 'maps'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}
function printAudi() {
  var htmlString = "<p class = 'mapsheader'> SUTD Auditorium <br /> Building 2, Levels 1-2 </p>";
  var img = "<img src = '/img/audi.png' class = 'maps'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}
function printFabLab() {
  var htmlString = "<p class = 'mapsheader'> SUTD Fabrication Lab. <br /> Building 5, Levels 1-2 </p>";
  var img = "<img src = '/img/fablab.png' class = 'maps'>";
  transOut();
  display.innerHTML = htmlString;
  display.innerHTML += img;
  setTimeout(transIn(), 100);
}
function transOut() {
  main.style = "visibility: hidden; transition: visibility 0.8s linear, opacity 0.8s linear; height:0%; overflow:hidden; opacity: 0;";
}
function transIn() {
  main.style = "visibility: visible; transition:opacity 0.8s linear; height:auto; overflow:hidden; opacity: 1;";
}
//end of page-specific functions

function dirInit() {
	loadDirectory();
}

function loadDirectory() {
  var htmlString = "<p class = 'mapsheader'> Welcome to SUTD <br /> Which location would you like displayed? </p>";
  var img = "<img src = '/img/school.png' class = 'maps'>";
  $display.innerHTML = htmlString;
  display.innerHTML += img;
	dirDirectory[KEY_1] = loadDirectory;
  dirDirectory[KEY_2] = loadDirectory;
  dirDirectory[KEY_3] = printCanteen;
  dirDirectory[KEY_4] = printAudi;
  dirDirectory[KEY_5] = printAHLT;
  dirDirectory[KEY_6] = printFabLab;
  dirDirectory[KEY_7] = mainPage.init.bind(mainPage);

}
