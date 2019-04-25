//express app
var express = require('express');
var app = express();
var fs = require('fs');
var bglist = fs.readdirSync('src/static/img/bg/');
var http = require('http');

//logs
app.use(logErrors);
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

//static files
app.use('/', express.static(__dirname + '/deploy'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/weatherclock/img/', express.static(__dirname + '/assets/work/prototyping/weather_clock/'));

//shortcuts
app.get('/whiteblock', function(request, response, next) {
  response.redirect('/work/prototyping/white_block_clock/');
  next();
});
app.get('/weatherclock', function(request, response, next) {
  response.redirect('/work/prototyping/weather_clock/');
  next();
});
app.get('/facebook', function(request, response, next) {
  response.redirect('http://www.facebook.com/peterschirmer');
  next();
});
app.get('/linkedin', function(request, response, next) {
  response.redirect('http://www.linkedin.com/in/thisispete');
  next();
});
app.get('/github', function(request, response, next) {
  response.redirect('http://github.com/thisispete');
  next();
});

//background image rotator
app.get('/bg/*', function(request, response) {
  var filename = 'bg/'+ bglist[Math.floor(Math.random() * bglist.length)];
  if(app.get('env') === 'production'){
    response.redirect('http://aws.thisispete.com/images/' + filename);
  }else{
    response.sendFile(__dirname + '/assets/' + filename);
  }
});

//kickoff
var port = process.env.PORT || 5000;
http.createServer(app).listen(port, function(){
  console.log("Express server listening on port " + port);
});
