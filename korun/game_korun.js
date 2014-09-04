var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var sprite;
var space;

function preload() {
    game.load.image('background', 'assets/google/cloud-background2.png');
    game.load.spritesheet('bird', 'assets/flappy/bird.png', 34, 24, 3);
}

function create() {
    game.stage.backgroundColor = '#71c5cf';

    // pozadina i granici na svet
    game.world.setBounds(0, 0, game.width * 3, game.height);
    game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');

    // start na fizika
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false); // fix za da odbivat od granici

    korunGranici();

    // opcii na p2 fizika
    game.physics.p2.gravity.y = 1000;
    game.physics.p2.restitution = 0.9;

    // dodavanje na sprite ptica
    sprite = game.add.sprite(100, 100, 'bird');
    sprite.animations.add('flap');
    game.physics.p2.enable(sprite, true);
    game.camera.follow(sprite);


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
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
}

function update() {
    if (space.isDown) {
        sprite.body.moveUp(200);
        sprite.body.moveRight(400);
        sprite.animations.play('flap', 12, false);
        sprite.body.rotation = 0;
    }
}

function render() {
    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(sprite, 32, 32);
    game.debug.body(sprite);
}

var topGroup;
function korunGranici() {
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
        spriteTop.body.mass = 3;
        terrainWidth += currentWidth;
    }


}

function klimentGranici() {
    var graphics = game.add.graphics(0, 0);
    var graphicsbottom = game.add.graphics(0, 0);
    var upperdock = game.add.sprite(0, 0);
    var bottomdock = game.add.sprite(0, 600);

    game.physics.p2.enableBody(upperdock);
    upperdock.body.static = true;
    upperdock.body.clearShapes();
    //sprite.body.loadPolygon('physicsData','tetrisblock3');
    graphics.beginFill(0xFFFF0B);
    for (var x = 0, i = 0; x < game.width * 3; i++) {
        var width = Math.floor(Math.random() * 200);
        var height = Math.floor(Math.random() * 100 + (i % 2 * 180));
        upperdock.body.addRectangle(width, height, x + width / 2, height / 2, 0);

        graphics.drawRect(x, 0, width, height);

        x += width;
    }
    graphics.endFill();
    upperdock.addChild(graphics);
    game.physics.p2.enable(upperdock);

    game.physics.p2.enableBody(bottomdock);
    bottomdock.body.static = true;
    bottomdock.body.clearShapes();
    //sprite.body.loadPolygon('physicsData','tetrisblock3');
    graphicsbottom.beginFill(0xFFFF0B);
    for (var x = 0, i = 0; x < game.width * 3; i++) {
        var width = Math.floor(Math.random() * 200);
        var height = Math.floor(Math.random() * 100 + (i % 2 * 180));
        bottomdock.body.addRectangle(width, height, x + width / 2, height / 2 - height, 0);

        graphicsbottom.drawRect(x, -height, width, height)

        x += width;
    }
    graphicsbottom.endFill();
    bottomdock.addChild(graphicsbottom);
    game.physics.p2.enable(bottomdock);
}