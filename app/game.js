var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // var testBitmapData = new Phaser.BitmapData(game, 'testbmp');
    // testBitmapData.rect(50, 50, 50, 50);
    // testBitmapData.fill(255,255,255,1);
    // var wowow = game.add.sprite(10, 10, testBitmapData);
    // game.physics.arcade.enable(wowow);

    game.stage.backgroundColor = '#71c5cf';
    var graphics = game.add.graphics(0, 0);

    graphics.beginFill('#000000', 1);
    var rect = graphics.drawRect(0, 0, 100, 100);
    console.log(rect);
    graphics.alpha = 1;
    graphics.endFill();

    var sprite = game.add.sprite(100, 100);
    sprite.addChild(graphics);
    
    game.physics.arcade.enable(sprite);
    sprite.body.velocity.x = 50;

}

function update() {

}