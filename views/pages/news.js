// news page - function 3
var newsPage = new Page("news", newsInit, newsStop);

//const URL = 'http://www.channelnewsasia.com/rssfeeds/8395986';
//const URL = 'http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed';
const URL = "http://smart-mirror-news.azurewebsites.net/CNA";

var newsJson = null;

var newsItemPage = 0;

function newsInit() {
	newsPage.directory[KEY_1] = mainPage.init.bind(mainPage);

	loadNews();
	loadSidebar("news");
	document.addEventListener("keydown", newsKeyEvent);
}

function newsStop() {
	document.removeEventListener("keydown", newsKeyEvent);
}

function newsPageLoading() {
	$display.innerHTML = "<img src='/img/newsLoading.gif' width=800px height=800px>";
}

function generateNewsHTML(jsonObj, start, end) {
	var htmlString = "<div id='newsDisplay`>";

	for (var i=start; i<end; i++) {
		var obj = jsonObj[i];
		var orientation = i%2 ? "left" : "right";

		htmlString+= "<div class='newsItemContainer'>";
		htmlString+= `<img class="newsPic ${orientation}" src="${obj.thumbnail}">`;
		htmlString+= `<div class="newsText"><a href="${obj.link}"><p id="newsTitle">${obj.title}</p></a><p id="newsDescription">${obj.description}</p><br></div>`;
		htmlString+= "</div>";
	}

	htmlString+= "</div>";

	return htmlString;
}

function newsKeyEvent(event) {
	if (event.which == KEY_2 && currentPage == newsPage) {
		newsPageLoading();
		newsItemPage = (newsItemPage+1)%2;

		if (newsItemPage == 0) $display.innerHTML = generateNewsHTML(newsJson, 0, 4);
		else $display.innerHTML = generateNewsHTML(newsJson, 4, 8);
	}
}

function loadNews() {
	newsPageLoading();

	fetch(URL)
	.then(res => res.text())
	.then(jsonString => JSON.parse(jsonString))
	.then(function(jsonObj) {
		newsJson = jsonObj;
		$display.innerHTML = generateNewsHTML(newsJson, 0, 4);
	})
	.catch(err => {
		$display.innerHTML = `<div id='error'>${err}</div>`;
	});
}