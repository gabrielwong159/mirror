var newsPage = new Page("news", newsInit, null);
const URL = 'http://www.channelnewsasia.com/starterkit/servlet/cna/rss/home.xml';
//const URL = 'http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed';

function newsInit() {
	loadNews();
}

function loadNews() {
	fetch(URL)
	.then(res => res.text())
	.then(xmlText => xml2json(parseXml(xmlText), "  "))
	.then(jsonString => JSON.parse(jsonString))
	.then(function(jsonObj) {
		var htmlString = "<div id='newsDisplay'>";

		for (var i=8; i<18; i++) {
			var title = jsonObj.rss.channel[i].item.title;
			var description = jsonObj.rss.channel[i].item.description;

			htmlString+= "<p id='newsTitle'>" + title + "</p><p id='newsDescription'>" + description + "</p><br>";
		}
		htmlString+= "</div>";

		$display.innerHTML = htmlString;
	})
	.catch((err) => {
		$display.innerHTML = `<div id='error'>Yesss: ${err}</div>`;
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