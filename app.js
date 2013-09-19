//express app
var express = require('express');
var app = express();
var fs = require('fs');
var bglist = fs.readdirSync('src/static/img/bg/');
app.use(express.bodyParser());
app.use(app.router);
app.use(logErrors);
app.use(express.static(__dirname + '/deploy'));
app.use('/assets', express.static(__dirname + '/assets'));

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

app.get('/bg/*', function(request, response) {
  //render form
  var filename = 'bg/'+ bglist[Math.floor(Math.random() * bglist.length)];
  if(app.get('env') === 'production'){
    response.redirect('http://aws.thisispete.com/images/' + filename);
  }else{
    response.sendfile(__dirname + '/assets/' + filename);
  }


});


//kickoff
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
