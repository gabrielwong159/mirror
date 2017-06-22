var fetchUrl = require("fetch").fetchUrl;
var xml2json = require("simple-xml2json");

const URLS = {
	"cna": "http://www.channelnewsasia.com/rssfeeds/8395986",
	"sutd": "http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed"
}

const PORT = process.env.port || 5000;

var express = require("express");
var cors = require("cors");

var app = express();
app.use(cors());

app.get("/cna", function(req, res) {
	fetchUrl(URLS["cna"], function (error, meta, body) {
		var jsonObj = xml2json.parser(body.toString());
		var newsItems = jsonObj.rss.channel;

		var newsResult = [];
		for (var i=0; i<newsItems.totalresults; i++) {
			var item = newsItems.item[i];
			newsResult.push({
				"title": item.title,
				"link": item.link,
				"description": item.description,
				"thumbnail": item.thumbnail
			});
		}

		res.send(newsResult);
	});
});

app.listen(PORT, err => {
	if (err) throw err;
	console.log("News proxy running on port", PORT);
});

/* Example of news item - jsonObj.rss.channel.item[0]
{ guid: { ispermalink: 'false' },
  title: 'Tyre giant Michelin to cut nearly 2,000 jobs worldwide',
  link: 'http://www.channelnewsasia.com/news/business/tyre-giant-michelin-to-cut-nearly-2-000-jobs-worldwide-8969860',
  description: 'PARIS: Tyre giant Michelin is to cut nearly 2,000 jobs worldwide by 2021 as part of a reorganisation, the company announced on Thursday (Jun 22), saying there would be no forced redundancies.\n\nThe company plans to shed 1,500 staff in France, mostly by not replacing workers when they retire, and a ...',
  keywords: 'cut,United States,staff,Michelin,Jean-Dominique Senard,tyre,net profit,French,worldwide,company,Clermont-Ferrand,France,job',
  category: 'Business',
  pubdate: 'Thu, 22 June 2017 23:45:39 +0800',
  author: '\n          ',
  thumbnail: 'http://www.channelnewsasia.com/image/8969858/16x9/1280/780/35b9296bc093ad388e725e86b0b33667/kx/job-cuts-at-michelin-but-no-forced-redundancies-1498141582424-2.jpg' }
*/

/* Example on how to retrieve data
const URL = "http://127.0.0.1:5000/cna";

fetch(URL)
.then(res => res.text())
.then(jsonString => JSON.parse(jsonString))
.then(function(jsonObj) {
	for (var i=0; i<json.length; i++) {
		var title = json[i].title;
		var link = json[i].link;
		var description = json[i].description;
		var thumbnail = json[i].thumbnail;
	}
})
.catch(err => console.log(err));
*/