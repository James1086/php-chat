var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var active_player = '';
var connected_players = {};

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
			console.log('START!');
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
