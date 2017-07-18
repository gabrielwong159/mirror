
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

var mainPage = new Page("main", mainInit, null);

function mainInit() {
	mainPage.directory[KEY_2] = busPage.init.bind(busPage);
	mainPage.directory[KEY_3] = newsPage.init.bind(newsPage);
	mainPage.directory[KEY_4] = dirPage.init.bind(dirPage);
	mainPage.directory[KEY_5] = calPage.init.bind(calPage);
	mainPage.directory[KEY_6] = agendaPage.init.bind(agendaPage);

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
