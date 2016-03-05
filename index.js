var express = require('express');
var app = express();
var rp = require('request-promise');

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
		var returnedList = new Array(list.length);

		for (var i = 0; i < list.length; i++) {
			var options = {
				method: 'GET',
				uri: list[i],
				resolveWithFullResponse: true
			};

			rp(options)
			.then(function(response) {
				returnedList[i] = response.request.uri.href;

				if (i == list.length - 1)
					res.send({list: returnedList});
			});
		}
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