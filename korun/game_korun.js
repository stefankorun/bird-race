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

    game.world.setBounds(0, 0, game.width * 3, game.height);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false); // fix za da odbivat od granici

    console.log(game.world);
    game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');

    game.physics.p2.gravity.y = 1000;
    game.physics.p2.restitution = 0.9;

    var bmd = game.add.bitmapData(60, 60);
    sprite = game.add.sprite(100, 100, 'bird');
    sprite.animations.add('flap');



    bmd.clear();
    bmd.circle(30, 30, 30);
    bmd.fill('#FF00FF');


    game.physics.p2.enable(sprite);

    game.camera.follow(sprite);

    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
}

function update() {
    if (space.isDown) {
        sprite.body.velocity.y -= 200;
        sprite.body.velocity.x += 100;
        sprite.animations.play('flap', 12, false);
    }
}

function render() {
    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(sprite, 32, 32);
    // game.debug.physicsBody(sprite.body);
}