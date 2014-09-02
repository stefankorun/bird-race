var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var sprite;
var cursors;

function preload() {}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // var testBitmapData = new Phaser.BitmapData(game, 'testbmp');
    // testBitmapData.rect(50, 50, 50, 50);
    // testBitmapData.fill(255,255,255,1);
    // var wowow = game.add.sprite(10, 10, testBitmapData);
    // game.physics.arcade.enable(wowow);

    game.stage.backgroundColor = '#71c5cf';
    game.world.setBounds(0, 0, game.width * 3, game.height);
    var graphics = game.add.graphics(0, 0);

    graphics.beginFill('#000000', 1);
    var rect = graphics.drawRect(0, 0, 100, 100);
    console.log(rect);
    graphics.alpha = 1;
    graphics.endFill();

    sprite = game.add.sprite(100, 100);
    sprite.addChild(graphics);

    game.physics.arcade.enable(sprite);

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