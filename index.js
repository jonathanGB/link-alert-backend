var express = require('express');
var app = express();
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;

app.set('port', (process.env.PORT || 5000));

app.get('/gettingSourceLinks', function(req, res) {
	if (req.query.list) {
		var list = JSON.parse(req.query.list);
		returnedList = ["whale"];

		list.forEach(function(url, index) {
			getSourceLink(returnedList, url, index, function() {
				res.send({list: returnedList});
			});
		});
	}
	else {
		res.sendStatus(404);
	}
});

app.get('/', function(req, res) {
	if (req.query.list) {
		var list = JSON.parse(req.query.list);

		res.send(isHttps(list[0]));
	}
});

app.listen(app.get('port'));


function isHttps(url) {
	return /^https/.test(url);
}


function getSourceLink(returnedList, url, index, callback) {
	var protocol = isHttps(url) ?
		https :
		http;

	protocol.request({
		hostname: url
	}, function(res) {
		returnedList[index] = res.fetchedUrls;

		if (index == returnedList.length - 1)
			callback();
	});
}