var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var bird1 = new RaceGame.Bird(game, 'bird1', Phaser.Keyboard.SPACEBAR);
var bird2 = new RaceGame.Bird(game, 'bird2', Phaser.Keyboard.ENTER);

function preload() {
    game.time.advancedTiming = true; // za fps vo debug

    game.load.image('background', 'assets/google/cloud-background2.png');

    bird1.preload();
    bird2.preload();
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

    bird1.create();
    bird2.create();

    game.camera.follow(bird1.sprite);

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
}

function render() {
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
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