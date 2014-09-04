RaceGame = {
    Bird: function (game, name, button) {
        this.game = game;
        this.name = name;

        this.preload = function () {
            game.load.spritesheet('bird', 'assets/flappy/bird.png', 34, 24, 3);
        };
        this.create = function () {
            this.sprite = game.add.sprite(100, game.world.height / 2, 'bird');
            this.sprite.animations.add('flap');
            game.physics.p2.enable(this.sprite);

            game.input.keyboard.addKeyCapture(button);
            var space = game.input.keyboard.addKey(button);
            space.onDown.add(tiltBird);

            var that = this;
            function tiltBird() {
                that.sprite.body.moveUp(400);
                that.sprite.body.moveRight(400);
                that.sprite.animations.play('flap', 12, false);
                that.sprite.body.rotation = 0;
            }
        };
    },
    Terrain: {
        addTerrain: function (game) {
            // TODO Ova seckat ko ke e golema mapa, da se dodavat postepeno +/- edna camera
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
                spriteBottom.body.static = true;
                terrainWidth += currentWidth;
            }
        }

    }
};
