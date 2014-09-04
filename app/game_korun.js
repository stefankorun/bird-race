var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

// TODO Lista od objekti player
var player1;
var player2;


function preload() {
    game.load.image('background', 'assets/google/cloud-background2.png');
    game.load.spritesheet('bird', 'assets/flappy/bird.png', 34, 24, 3);
}

function create() {
    game.stage.backgroundColor = '#71c5cf';

    // pozadina i granici na svet
    game.world.setBounds(0, 0, game.width * 30, game.height);
    game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');

    // start na fizika
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false); // fix za da odbivat od granici

    addTerrain();

    // opcii na p2 fizika
    game.physics.p2.gravity.y = 2000;
    game.physics.p2.restitution = 0.9;

    // dodavanje na sprite ptica
    player1 = game.add.sprite(100, game.world.height / 2 - 50, 'bird');
    player1.animations.add('flap');
    game.physics.p2.enable(player1, true);
    game.camera.follow(player1);

    player2 = game.add.sprite(100, game.world.height / 2 + 50, 'bird');
    player2.animations.add('flap');
    game.physics.p2.enable(player2, true);


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

    // Keybinding    
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.NUMPAD_ENTER]);
    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(tiltPlayer1, 1);
    var npdEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    npdEnter.onDown.add(tiltPlayer2, this);


    // TODO Da se sredit lajnurijava
    function tiltPlayer1(args) {
        console.log(args);
        player1.body.moveUp(400);
        player1.body.moveRight(400);
        player1.animations.play('flap', 12, false);
        player1.body.rotation = 0;
    }
    function tiltPlayer2() {
        player2.body.moveUp(400);
        player2.body.moveRight(400);
        player2.animations.play('flap', 12, false);
        player2.body.rotation = 0;
    }
}

function update() {
}

function render() {
    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(player1, 32, 32);
    game.debug.body(player1);
}

var topGroup;
function addTerrain() {
    topGroup = game.add.group();

    var terrainWidth = 0;
    while (terrainWidth < game.world.width) {
        var currentWidth = _.random(20, 150);
        var currentHeight = _.random(20, 250);

        var bmd = game.add.bitmapData(currentWidth, currentHeight);
        bmd.clear();
        bmd.fill(_.random(0, 255), _.random(0, 255), _.random(0, 255));
        var spriteTop = game.add.sprite(terrainWidth + currentWidth / 2, 0 + currentHeight / 2, bmd);
        var spriteBottom = game.add.sprite(terrainWidth + currentWidth / 2, game.world.height - currentHeight / 2, bmd);
        game.physics.p2.enable(spriteTop);
        game.physics.p2.enable(spriteBottom);
        spriteTop.body.static = true;
        spriteBottom.body.mass = 8;
        terrainWidth += currentWidth;
    }
}