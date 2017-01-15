<<<<<<< HEAD
	var newsPage = new Page("news", newsInit, null);
	//const URL = 'http://www.channelnewsasia.com/starterkit/servlet/cna/rss/home.xml';
	const URL = 'http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed';
=======
var newsPage = new Page("news", newsInit, null);
//const URL = 'http://www.channelnewsasia.com/starterkit/servlet/cna/rss/home.xml';
const URL = 'http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed';
>>>>>>> origin/master

	function newsInit() {
		loadNews();
	}

	//newsPage.init() [I BLACKED THIS OUT]

<<<<<<< HEAD
	function loadNews() {
		fetch(URL)
=======
newsPage.init()

function loadNews() {
	fetch(URL)
>>>>>>> origin/master
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
<<<<<<< HEAD
		$display.innerHTML = `<div id='error'>Yesss: ${err}</div>`;
=======
		$display.innerHTML = `<div id='error'>Yes: ${err}</div>`;
>>>>>>> origin/master
	});
}
