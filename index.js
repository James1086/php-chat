// Heroku static files
process.env.PWD = process.cwd()


var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 3000);

// Heroku static files
app.set('views', path.join(process.env.PWD, 'public'));
app.use(express.static(path.join(process.env.PWD, 'public')));

console.log(process.env.PWD);
conosle.log(__dirname);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});


/*
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var active_player = '';
var connected_players = {};

app.use(express.static( 'public'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

	socket.on('player_ready', function(msg) {
		console.log(msg + '(' + socket.id + ') is ready!');
		connected_players[socket.id] = msg;
		
		console.log('PLAYERS:');
		console.log(connected_players);
		
		if(Object.keys(connected_players).length == 2) {
			console.log('Starting:');
			var keys = Object.keys(connected_players);				
			console.log(connected_players[keys[ keys.length * Math.random() << 0]]);
		}
	});
	
	socket.on('disconnect', function() {
		delete connected_players[socket.id];
		console.log('PLAYERS:');
		console.log(connected_players);
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
*/