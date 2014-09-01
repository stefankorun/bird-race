var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
}
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var testBitmapData = new Phaser.BitmapData(game, 'testbmp');
    testBitmapData.rect(50, 50, 50, 50);
    testBitmapData.fill(255,255,255,1);

    var wowow = game.add.sprite(10, 10, testBitmapData);

    console.log(testBitmapData, wowow);

    game.physics.arcade.enable(wowow);

}
function update() {

}