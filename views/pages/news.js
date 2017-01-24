var newsPage = new Page("news", newsInit, null);
const URL = 'http://www.channelnewsasia.com/starterkit/servlet/cna/rss/home.xml';
//const URL = 'http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed';

function newsInit() {
	loadNews();
}

var json;

function loadNews() {
	fetch(URL)
	.then(res => res.text())
	.then(xmlText => xml2json(parseXml(xmlText), "  "))
	.then(jsonString => JSON.parse(jsonString))
	.then(function(jsonObj) {	
		json = jsonObj;	
		fetchNews(jsonObj, "<div id='newsDisplay'>", 8);
	})
	.catch((err) => {
		$display.innerHTML = `<div id='error'>Yesss: ${err}</div>`;
	});
}

function fetchNews(jsonObj, htmlString, counter) {
	if (counter == 18) {
		htmlString+= "</div>";
		$display.innerHTML = htmlString;
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

		htmlString+= "<a href='" + url + "'><p id='newsTitle'>" + title + "</p></a><p id='newsDescription'>" + description + "</p><br>";
		htmlString+= '<img class="newsPic" src="' + imageUrl + '">';
	})
	.then(function() {
		return htmlString+= fetchNews(jsonObj, htmlString, counter+1);
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