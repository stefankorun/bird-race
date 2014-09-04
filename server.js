var _ =require('lodash');

var port = Number(process.env.PORT || 5000);
var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/'));
var server=app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
}).listen(port);

var io = require('socket.io').listen(server);

var players={};
io.sockets.on('connection', function (socket) {
    socket.emit('connected', { type: 0, err: 0 , msg: "successful connection"});

    socket.on('register', function (data) {
        console.log("READY");
        players[data.name]={socket:socket,opponent:{name:null,socket:null}};
        console.log('Player ' + data.name + ' has connected.');
        io.sockets.emit('player list',{list:getList()});
    });//register - event

    socket.on('request',function(data){
        var player=players[data.opponentName];
        player.socket.emit('game request',{opponent:data.name});
    });
    socket.on('accept',function(data){
        console.log(data);
        var player1=players[data.opponentName];
        var player2=players[data.name];
        if(player1){
            player1.socket.emit('game accepted',{opponent:data.opponentName});
        }
        else player2.socket.emit('game failed',{opponent:data.opponentName});
    });

    socket.on('game data',function(data){
        var player=players[data.name];
        player.opponent.socket.emit('game data',data);
    });

    socket.on('disconnect',function(){
       for(var key in players ){
           if(players[key].socket.id==this.id){
               delete players[key];
               break;
           }
       }
    });
});


function getList(){
    var list=[];
   for(var key in players){
       list.push(key);
    };
    return list;
}