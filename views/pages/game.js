var gamePage = new Page("game", gameInit, null);

function gameInit() {
	gamePage.directory[KEY_1] = mainPage.init.bind(mainPage);

	$display.innerHTML = "<div id='game' />";
	$.getScript("/js/canttouchthis.js");
	loadSidebar("game");
}