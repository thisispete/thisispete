//express app
var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(app.router);
app.use(logErrors);
app.use(express.static(__dirname + '/deploy'));

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
};

//kickoff
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
