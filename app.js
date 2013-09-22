//express app
var express = require('express');
var app = express();
var fs = require('fs');
var bglist = fs.readdirSync('src/static/img/bg/');
var http = require('http');

app.use(express.bodyParser());
app.use(logErrors);
app.use('/', express.static(__dirname + '/deploy'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/weatherclock/img/', express.static(__dirname + '/assets/play/electronics/weather_clock/'));

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

app.get('/whiteblock', function(request, response, next) {
  response.redirect('/play/electronics/white_block_clock/');
  next();
});
app.get('/weatherclock', function(request, response, next) {
  response.redirect('/play/electronics/weather_clock/');
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

app.get('/bg/*', function(request, response) {
  var filename = 'bg/'+ bglist[Math.floor(Math.random() * bglist.length)];
  if(app.get('env') === 'production'){
    response.redirect('http://aws.thisispete.com/images/' + filename);
  }else{
    response.sendfile(__dirname + '/assets/' + filename);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
