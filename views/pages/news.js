// news page - function 3
var newsPage = new Page("news", newsInit, newsStop);

//const URL = 'http://www.channelnewsasia.com/rssfeeds/8395986';
//const URL = 'http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed';
const URL = "http://smart-mirror-news.azurewebsites.net/CNA";
retrieveNews();
newsPage.globals.reqInterval = setInterval(retrieveNews, 5 * 60 * 1000)

newsPage.globals.json = null;
newsPage.globals.page = 0;

function newsInit() {
	newsPage.directory[KEY_1] = mainPage.init.bind(mainPage);

	loadNews();
	loadSidebar("news");
	document.addEventListener("keydown", newsKeyEvent);
}

function newsStop() {
	document.removeEventListener("keydown", newsKeyEvent);
}

function retrieveNews() {
	fetch(URL)
	.then(res => res.text())
	.then(jsonString => JSON.parse(jsonString))
	.then(function(jsonObj) {
		newsPage.globals.json = jsonObj;
	})
	.catch(err => {
		$display.innerHTML = `<div id='error'>${err}</div>`;
	});
}

function loadNews() {
	$display.innerHTML = generateNewsHTML(newsPage.globals.json, 0, 4);
}

function generateNewsHTML(jsonObj, start, end) {
	var htmlString = "<div id='news'>";

	for (var i=start; i<end; i++) {
		var obj = jsonObj[i];
		var orientation = i%2 ? "left" : "right";

		htmlString+= "<div class='newsItemContainer'>";
		htmlString+= `<div class="imgContainer"><img class="newsPic ${orientation}" src="${obj.thumbnail}"></div>`;
		htmlString+= `<div class="newsText"><a href="${obj.link}"><p id="newsTitle">${obj.title}</p></a><p id="newsDescription">${obj.description}</p><br></div>`;
		htmlString+= "</div>";
	}

	htmlString+= "</div>";

	return htmlString;
}

function newsKeyEvent(event) {
	if (event.which == KEY_2 && currentPage == newsPage) {
		newsPage.globals.page = 1 - newsPage.globals.page;

		if (newsPage.globals.page == 0) $display.innerHTML = generateNewsHTML(newsPage.globals.json, 0, 4);
		else $display.innerHTML = generateNewsHTML(newsPage.globals.json, 4, 8);
	}
}

