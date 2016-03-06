var rp = require('request-promise');

var list = JSON.parse('["https://bit.ly/1X1rUHB"]');
var returnedList = new Array(list.length);

function getSource(index) {
	var options = {
		method: 'GET',
		uri: list[index],
		resolveWithFullResponse: true
	};

	rp(options)
	.then(function(response) {
		returnedList[index] = response.request.uri.href;

		if (index == list.length - 1)
			console.log(returnedList);
		else
			getSource(index+1);
	});
}

getSource(0);