var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
	res.send('{"xp": "looooooooool"}');
});

app.listen(app.get('port'));