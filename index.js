var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var active_player = '';
var connected_players = [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	connected_players.push(socket.id);
	if(connected_players.length == 2) {
		console.log('START!');
	}
	
	console.log('PLAYERS:');
	console.log(connected_players);
	
	/*
	socket.on('ready_message', function() {
		console.log(socket.id + ' is ready!');
	});
	*/
	
	socket.on('ready_message', function(msg){
		console.log(msg);
	});
	
	socket.on('disconnect', function() {
		var i = connected_players.indexOf(socket.id);
		connected_players.splice(i, 1);
		
		console.log('PLAYERS:');
		console.log(connected_players);
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
