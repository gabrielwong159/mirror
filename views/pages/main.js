
//this hides everything in the html so we can have bus overlay
function hideBox(elementID)
{
    document.getElementById(elementID).style = "visibility: hidden; height:0%; overflow:hidden;";
}

//this shows everything in the html so we can have bus overlay
function showBox(elementID)
{
    document.getElementById(elementID).style = "visibility: visible; height:auto; overflow:hidden;";
}
//end of this

const mainDirectory = {
	[KEY_2]: busPage.init.bind(busPage),
	[KEY_3]: newsPage.init.bind(newsPage),
	[KEY_4]: dirPage.init.bind(dirPage),
	[KEY_5]: calPage.init.bind(calPage)
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
}

mainPage.init();

defaultDirectory[KEY_1] = mainPage.init.bind(mainPage);
