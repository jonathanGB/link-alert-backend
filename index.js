var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
	req.query.list ?
		res.send(req.query.list):
		res.send("noooooope");
});

app.listen(app.get('port'));