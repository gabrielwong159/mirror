// news page - function 3
var newsPage = new Page("news", newsInit, newsStop);

const URL = 'http://www.channelnewsasia.com/starterkit/servlet/cna/rss/home.xml';
//const URL = 'http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed';

var newsJson = null;

var newsItemPage = 0;

function newsInit() {
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

function newsKeyEvent(event) {
	if (event.which == KEY_2 && currentPage == "news") {
		newsPageLoading();
		newsItemPage = (newsItemPage+1)%2;

		if (newsItemPage == 0) fetchNews(newsJson, "<div id='newsDisplay'>", 8, 12);
		else fetchNews(newsJson, "<div id='newsDisplay'>", 12, 16);
	}
}

function loadNews() {
	newsPageLoading();

	fetch(URL)
	.then(res => res.text())
	.then(xmlText => xml2json(parseXml(xmlText), "  "))
	.then(jsonString => JSON.parse(jsonString))
	.then(function(jsonObj) {
		newsJson = jsonObj;
		fetchNews(newsJson, "<div id='newsDisplay'>", 8, 12); // 8-18 for all 10 entries
	})
	.catch((err) => {
		$display.innerHTML = "<div id='error'>Yesss: ${err}</div>";
	});
}

function fetchNews(jsonObj, htmlString, counter, last) {
	if (counter == last) {
		htmlString+= "</div>";
		$display.innerHTML = htmlString;

		return null;
	}

	var item = jsonObj.rss.channel[counter].item;
	var title = item.title;
	var description = item.description;
	var url = item.link;

	fetch(item.link)
	.then(res => res.text())
	.then(function (htmlText) {
		imageUrl = '';

		var index = htmlText.search('.jpg');
		if (index>=0) {
			var htmlSubstring = htmlText.substring(index+4);
			var frontIndex = htmlText.search('<meta property="og:image" content="');

			if (frontIndex>=0) {
				var endIndex = htmlText.search('.jpg');
				imageUrl = htmlText.substring(frontIndex+35, endIndex+4);
			}
		}

		htmlString+= "<div class='newsItemContainer'>";
		htmlString+= '<img class="newsPic ' + (counter%2 ? 'left':'right') + '" src="' + imageUrl + '">';
		htmlString+= "<div class='newsText'><a href='" + url + "'><p id='newsTitle'>" + title + "</p></a><p id='newsDescription'>" + description + "</p><br></div>";
		htmlString+= "</div>";
	})
	.then(function() {
		return htmlString+= fetchNews(jsonObj, htmlString, counter+1, last);
	});

}

function parseXml(xml) {
   var dom = null;
   if (window.DOMParser) {
      try {
         dom = (new DOMParser()).parseFromString(xml, "text/xml");
      }
      catch (e) { dom = null; }
   }
   else if (window.ActiveXObject) {
      try {
         dom = new ActiveXObject('Microsoft.XMLDOM');
         dom.async = false;
         if (!dom.loadXML(xml)) // parse error ..
            window.alert(dom.parseError.reason + dom.parseError.srcText);
      }
      catch (e) { dom = null; }
   }
   else
      alert("oops");
   return dom;
}
