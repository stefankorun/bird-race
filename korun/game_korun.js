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

    // opcii na p2 fizika
    game.physics.p2.gravity.y = 1000;
    game.physics.p2.restitution = 0.9;

    // dodavanje na sprite ptica
    sprite = game.add.sprite(100, 100, 'bird');
    sprite.animations.add('flap');
    game.physics.p2.enable(sprite, true);
    game.camera.follow(sprite);

    // var bmd = game.add.bitmapData(60, 60);
    // bmd.clear();
    // bmd.circle(30, 30, 30);
    // bmd.fill('#FF00FF');

    var gph = game.add.graphics(0, 0);
    gph.beginFill('#000000', 1);
    var rect = gph.drawPolygon(new Phaser.Polygon(0, 0, 50, 50, 60, 60, 40, 100));
    console.log(rect);
    gph.alpha = 1;
    gph.endFill();

    var gphSprite = game.add.sprite(150, 150);
    gphSprite.addChild(gph);
    game.physics.p2.enable(gphSprite, true);
    gphSprite.body.addPolygon({}, 0, 50, 60, 40, 100)
    
    // Keybinding    
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
}

function update() {
    if (space.isDown) {
        sprite.body.moveUp(200);
        sprite.body.moveRight(100);
        sprite.animations.play('flap', 12, false);
    }
}

function render() {
    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(sprite, 32, 32);
    game.debug.body(sprite);
}