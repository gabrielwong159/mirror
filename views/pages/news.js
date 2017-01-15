
var newsPage = new Page("news", newsInit, null);
//const URL = 'http://www.channelnewsasia.com/starterkit/servlet/cna/rss/home.xml';
const URL = 'http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed';

function newsInit() {
	loadNews();
}

//newsPage.init() [I BLACKED THIS OUT]


function loadNews() {
	fetch(URL)
	.then(res => res.text())
	.then(function(text) {
		console.log('yes');

		var xmlString = $.parseXML(text);
		var xml = $(xmlString);

		//TODO: parse the xml here

		var xmlText = xml.find('title').text();

		$display.innerHTML = "<div id=\"news\"><p>" + xmlText + "hi </p></div>";
	})
	.catch((err) => {

		$display.innerHTML = `<div id='error'>Yesss: ${err}</div>`;

	});
}
