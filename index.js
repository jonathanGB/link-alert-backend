var express = require('express');
var app = express();
var rp = require('request-promise');

app.set('port', (process.env.PORT || 5000));

app.get('/gettingSourceLinks', function(req, res) {
	if (req.query.list) {
		var list = JSON.parse(req.query.list);
		var returnedList = new Array(list.length);

		getSource(list, returnedList, 0, res);
	} else {
		res.send(404);
	}
});


function getSource(list, returnedList, index, res) {
	var options = {
		method: 'GET',
		uri: list[index],
		resolveWithFullResponse: true
	};

	options.uri = options.uri.replace(/^\/\//, 'http://');

	rp(options)
	.then(function(response) {
		returnedList[index] = response.request.uri.href;

		if (index == list.length - 1)
			res.send({list: returnedList});
		else
			getSource(list, returnedList, index + 1, res);
	});
}

app.listen(app.get('port'));
