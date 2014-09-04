var connection={
    socket:null,
    globals:{
        uri:"ws://localhost:5000",
        name:"Player"
    },
    setName:function(name){
        connection.globals.name=name;
    },
    init:function(name){
        console.log(name);
        connection.globals.name=name;
        connection.socket=io.connect(connection.globals.uri);
        connection.socket.on('connected',connection.socketConnected);
        connection.socket.on('game request',connection.gameRequest);
        connection.socket.on('game accepted',connection.gameAccepted);
        connection.socket.on('game failed',connection.gameFailed);
        connection.socket.on('player list',connection.playerList);
    },
    socketConnected:function(data){
        console.log('CONNECTED');
        console.log(data);
        if(data.err==0)
            connection.socket.emit('register',{name:connection.globals.name});
    },
    gameRequest:function(data){
        console.log(data);
        connection.globals.opponentName=data.opponent;
    },
    gameAccepted:function(data){
        console.log(data);
    },
    gameFailed:function(data){
        console.log(data);
    },
    playerList:function(data) {
        console.log(data);
    },
    request: function (opponent) {
        connection.socket.emit('request',{name:connection.globals.name,opponentName:opponent});
        connection.globals.opponentName=opponent;
    },
    accept:function(){
        connection.socket.emit('accept',{name:connection.globals.name,opponentName:connection.globals.opponentName});
    }
};