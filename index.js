// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/script'));


app.get('/',function(req,res){
  res.sendFile('index.html');
});


var active_player = '';
var connected_players = {};




// Routing
app.use(express.static(path.join(__dirname, '/public')));

app.get('/',function(req,res){
  res.sendFile((path.join(__dirname + '/index.html'));
});


/*
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
*/

/*
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
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