process.env.PWD = process.cwd();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var active_player = '';
var connected_players = {};

var PIXI = require("pixi.min.js");

app.set('views', path.join(process.env.PWD, 'public'));
app.use(express.static(path.join(process.env.PWD, 'public')));

/*
app.get('/', function(req, res){
	res.sendFile(process.env.PWD + '/index.html');
});
*/

io.on('connection', function(socket){

	socket.on('player_ready', function(character) {		
		console.log(character.name + '(' + socket.id + ') the ' + character.hero + ' is ready! ');
		console.log(character.name + '(ATT: ' + character.attack + '(DEF: ' + character.defence + '(SPD: ' + character.speed + '(LUK: ' + character.luck);
		connected_players[socket.id] = character;
		
		console.log('PLAYERS:');
		console.log(connected_players);
		
		if(Object.keys(connected_players).length == 2) {
			console.log('Starting:');
			var keys = Object.keys(connected_players);				
			console.log(connected_players[keys[ keys.length * Math.random() << 0]]);
			
			
			//Create the renderer
			var renderer = PIXI.autoDetectRenderer(256, 256);

			//Add the canvas to the HTML document
			document.body.appendChild(renderer.view);

			//Create a container object called the `stage`
			var stage = new PIXI.Container();

			//Tell the `renderer` to `render` the `stage`
			renderer.render(stage);
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