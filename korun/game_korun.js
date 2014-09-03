var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var sprite;
var cursors;

function preload() {
//    this.load.image('background', 'assets/flappy/background.png');
}

function create() {
    game.stage.backgroundColor = '#71c5cf';


    game.world.setBounds(0, 0, game.width, game.height);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false); // fix za da odbivat od granici

    game.physics.p2.gravity.y = 200;
    game.physics.p2.restitution = 0.8;

    var bmd = game.add.bitmapData(60, 60);
    sprite = game.add.sprite(100, 100, bmd);
    bmd.clear();
    bmd.circle(30, 30, 30);

    game.physics.p2.enable(sprite);

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        sprite.body.velocity.x -= 200;
    }
    else if (cursors.right.isDown) {
        sprite.body.velocity.x += 200;
    }

    if (cursors.up.isDown) {
        sprite.body.velocity.y -= 200;
    }
    else if (cursors.down.isDown) {
        sprite.body.velocity.y += 200;
    }

}

function render() {
    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(sprite, 32, 32);
    // game.debug.physicsBody(sprite.body);
}