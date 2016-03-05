var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/gettingSourceLinks', function(req, res) {
	if (req.query.list)
		res.send(typeof req.query.list);
	else
		res.send("noooooope");
});

app.listen(app.get('port'));