
//this hides everything in the html so we can have bus overlay
function hideBox(elementID)
{
  document.getElementById(elementID).style = "visibility: hidden; transition: visibility 0.8s linear, opacity 0.8s linear; height:0; overflow:hidden; opacity: 0;";
}
//this shows everything in the html so we can have bus overlay
function showBox(elementID)
{
  document.getElementById(elementID).style = "visibility: visible; transition:opacity 0.8s linear; height:auto; overflow:hidden; opacity: 1;";
}
//end of this

var mainDirectory = {};

var mainPage = new Page("main", mainInit, null, mainDirectory);

function mainInit() {
	loadMain();
	loadSidebar("main");
}

function loadMain() {
	$display.innerHTML = "<img src='/img/idcwelcome.png' id = 'idcwelcome'>";
	hideBox("busdiv");
	hideBox("caldiv");
	hideBox("agddiv");
	showBox("info");
	showBox("main");
	showBox("motd");
}

mainPage.init();

//deprecated
//defaultDirectory[KEY_1] = mainPage.init.bind(mainPage);
