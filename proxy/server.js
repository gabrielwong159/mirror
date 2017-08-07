require("dotenv").config();
var fetchUrl = require("fetch").fetchUrl;
var xml2json = require("simple-xml2json");

const URLS = {
	"cna": "http://www.channelnewsasia.com/rssfeeds/8395986",
	"sutd": "http://www.sutd.edu.sg/About-Us/News-and-Events/News?rss=newsFeed",
	"bbc": "http://feeds.bbci.co.uk/news/rss.xml"
}

const PORT = process.env.port || 5000;

var express = require("express");
var cors = require("cors");

var app = express();
app.use(cors());

app.get("/bus", function(req, res) {
	var url = `http://datamall2.mytransport.sg/ltaodataservice/BusArrival?BusStopID=${req.query.id || 96049}`;
	var options = { headers: {"AccountKey": process.env.ltaKey} };
	fetchUrl(url, options, function(error, meta, body) {
		var jsonObj = JSON.parse(body.toString());
		var now = Date.now();
		var result = {};
		for (i in jsonObj.Services) {
			var service = jsonObj.Services[i];
			var busNumber = service.ServiceNo;
			var nextArrival = service.NextBus.EstimatedArrival;
			var subsequentArrival = service.SubsequentBus3.EstimatedArrival;

			result[busNumber] = {
				"next": nextArrival ? parseInt((new Date(nextArrival) - now)/60000) : null,
				"subsequent": subsequentArrival ? parseInt((new Date(subsequentArrival) - now)/60000) : null,
				"status": service.Status
			};
		}

		res.send(result);
	});
});

app.get("/maps", function(req, res) {
	var result = {};
	var loc = {
		"sutd": "1.340284,103.962949",
		"simei": "1.343197,103.953399",
		"tanah": "1.327179,103.946499",
		"simpang": "1.331052,103.948366"
	};
	function getDuration(origin, destination) {
		var url = `https://maps.googleapis.com/maps/api/directions/json?origin=${loc[origin]}&destination=${loc[destination]}&mode=transit&transit_mode=bus&key=${process.env.gmapsKey}`;
		fetchUrl(url, function(error, meta, body) {
			var jsonObj = JSON.parse(body.toString());
			var steps = jsonObj["routes"][0]["legs"][0]["steps"];
			var duration = 0;
			for (i in steps) duration+= steps[i]["duration"]["value"];
			result[destination] = parseInt(duration/60);
			if (result["simei"] && result["tanah"] && result["simpang"]) res.send(result);
		});
	}
	getDuration("sutd", "simei");
	getDuration("sutd", "tanah");
	getDuration("sutd", "simpang");
});

app.get("/:site", function(req, res) {
	var site = req.params.site.toLowerCase();

	fetchUrl(URLS[site], function(error, meta, body) {
		var jsonObj = xml2json.parser(body.toString());
		var result = getNews(site, jsonObj);
		console.log(JSON.stringify(result, null, 4));
		res.send(result);

	});
});

function getNews(site, jsonObj) {
	var newsItems = jsonObj.rss.channel;
	var newsCount = newsItems.item.length;

	var res = [];
	for (var i=0; i<newsCount; i++) {
		var item = newsItems.item[i];

		if (site == "cna") {
			res.push({
				"title": item.title,
				"link": item.link,
				"description": item.description,
				"thumbnail": item.thumbnail
			});
		}
		else if (site == "sutd") {
			res.push({
				"title": item.title,
				"link": item.link
			});
		}
		else if (site == "bbc") {
			res.push({
				"title": item.title,
				"link": item.link,
				"description": item.description,
				"thumbnail": item['media%3athumbnail'].url
			});
		}
	}

	return res;
}

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