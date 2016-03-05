var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  req.xhr ?
  res.send("ajax baby"):
  res.send("nope nope nope");
});

app.listen(app.get('port'));