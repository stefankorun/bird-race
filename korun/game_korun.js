var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var sprite;
var cursors;

function preload() {
}

function create() {
    game.stage.backgroundColor = '#71c5cf';

    game.world.setBounds(0, 0, game.width * 3, game.height);
    game.physics.startSystem(Phaser.Physics.P2JS);
//    game.physics.p2.setBoundsToWorld(true, true, true, true, false); // fix za da odbivat od granici

    klimentGranici();

    game.physics.p2.gravity.y = 200;
    game.physics.p2.restitution = 0.8;

    var bmd = game.add.bitmapData(100, 100);
    sprite = game.add.sprite(100, 100, bmd);
    bmd.clear();
    bmd.circle(30, 30, 30);
    bmd.resize(60, 60);
    bmd.circle(30, 30, 30);
    sprite.frame = bmd.textureFrame;

    game.physics.p2.enable(sprite);
    game.camera.follow(sprite);
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {
    if (cursors.left.isDown) {
        sprite.x -= 4;
    }
    else if (cursors.right.isDown) {
        sprite.x += 4;
    }

    if (cursors.up.isDown) {
        sprite.y -= 4;
    }
    else if (cursors.down.isDown) {
        sprite.y += 4;
    }

}

function render() {
    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(sprite, 32, 32);
    // game.debug.physicsBody(sprite.body);
}

function klimentGranici() {
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

        graphics.drawRect(x, 0, width, height)

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