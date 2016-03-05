var express = require('express');
var app = express();
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;

app.set('port', (process.env.PORT || 5000));

app.get('/gettingSourceLinks', function(req, res) {
	if (req.query.list) {
		var list = JSON.parse(req.query.list);

		list.forEach(function(url, index) {
			list[index] = getSourceLink(url);
		});

		res.send({list: list});
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
	var sourceLink = 'a';

	var protocol = isHttps(url) ?
		https :
		http;

	protocol.get(url, function(res) {
		sourceLink = res.fetchedUrls;
	});

	return sourceLink;
}