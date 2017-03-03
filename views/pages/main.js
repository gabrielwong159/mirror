
//this hides everything in the html so we can have bus overlay
function hideBox(elementID)
{
  document.getElementById(elementID).style = "visibility: hidden; transition: visibility 0.8s linear, opacity 0.8s linear; height:0%; overflow:hidden; opacity: 0;";
}
//this shows everything in the html so we can have bus overlay
function showBox(elementID)
{
  document.getElementById(elementID).style = "visibility: visible; transition:opacity 0.8s linear; height:auto; overflow:hidden; opacity: 1;";
}
//end of this

const mainDirectory = {
	[KEY_2]: busPage.init.bind(busPage),
	[KEY_3]: newsPage.init.bind(newsPage),
	[KEY_4]: dirPage.init.bind(dirPage),
	[KEY_5]: calPage.init.bind(calPage),
  [KEY_6]: agendaPage.init.bind(agendaPage)
};

var mainPage = new Page("main", mainInit, null, mainDirectory);

function mainInit() {
	loadMain();
	loadSidebar("main");
}

function loadMain() {
	$display.innerHTML = "<img src='/img/idcwelcome.png'>";
	showBox("info");
	showBox("main");
	showBox("motd");
	hideBox("busdiv");
 	hideBox("caldiv");
  hideBox("agddiv");
}

mainPage.init();

defaultDirectory[KEY_1] = mainPage.init.bind(mainPage);
