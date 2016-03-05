var express = require('express');
var app = express();
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;

app.set('port', (process.env.PORT || 5000));

app.get('/gettingSourceLinks', function(req, res) {
	if (req.query.list) {
		var list = JSON.parse(req.query.list);
		res.send(list[0]);
		// var returnedList = [];

		// list.forEach(function(url) {
		// 	returnedList.push(getSourceLink(url));
		// });

		// res.send({list: returnedList});
	}
	else {
		res.sendStatus(404);
	}
});

app.listen(app.get('port'));


function isHttps(url) {
	return /^https/.test(url);
}


function getSourceLink(url) {
	var sourceLink = '';

	var protocol = isHttps(url) ?
		https :
		http;

	protocol.get(url, function(res) {
		sourceLink = res.fetchedUrls[0];
	});

	return sourceLink;
}