var game = new Phaser.Game(1200, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var bird1 = new RaceGame.Bird(game, 'bird1', Phaser.Keyboard.SPACEBAR);
var bird2 = new RaceGame.Bird(game, 'bird2', Phaser.Keyboard.ENTER);
var players = new RaceGame.CurrentPlayers(game);

function preload() {
    game.time.advancedTiming = true; // za fps vo debug

    game.load.image('background', 'assets/google/cloud-background2.png');

    players.addPlayer(bird1);
    players.addPlayer(bird2);
}

function create() {
    game.stage.backgroundColor = '#71c5cf';

    // pozadina i granici na svet
    game.world.setBounds(0, 0, game.width * 30, game.height);
    game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');

    // start na fizika
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false); // fix za da odbivat od granici

    RaceGame.Terrain.addTerrain(this);

    // opcii na p2 fizika
    game.physics.p2.gravity.y = 2000;
    game.physics.p2.restitution = 0.9;

    players.createAll();

//    var gph = game.add.graphics(0, 0);
//    gph.beginFill('#000000', 1);
//    var rect = gph.drawPolygon(new Phaser.Polygon(0, 0, 50, 50, 60, 60, 40, 100));
//    console.log(rect);
//    gph.alpha = 1;
//    gph.endFill();
//
//    var gphSprite = game.add.sprite(150, 150);
//    gphSprite.addChild(gph);
//    game.physics.p2.enable(gphSprite, true);
//    gphSprite.body.addPolygon({}, 0, 50, 60, 40, 100);
}

function update() {
    players.checkCamera();
}

function render() {
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
}
