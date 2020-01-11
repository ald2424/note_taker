var express = require("express");
var fs = require('fs');
var app = express();

// The var PORT will take whatever port the deployment site (i.e. Heroku) or localhost 8080.
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

 // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });