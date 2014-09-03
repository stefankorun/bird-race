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
    game.physics.p2.setBoundsToWorld(true, true, true, true, false); // fix za da odbivat od granici

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