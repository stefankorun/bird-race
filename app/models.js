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
    CurrentPlayers: function (game) {
        var players = [];
        var leader;

        this.addPlayer = function (bird) {
            bird.preload();
            players.push(bird);
        };
        this.createAll = function () {
            _.each(players, function (player) {
                player.create();
            });
        };
        this.checkCamera = function () {
            if (updateLeader()) {
                game.camera.follow(leader.sprite, Phaser.Camera.FOLLOW_TOPDOWN);
            }
        };

        function updateLeader() {
            // true - leader has changed
            if (!leader) {
                leader = players[0];
                return true;
            }
            var previousLeader = leader;
            _.each(players, function (player) {
                if (leader.sprite.x < player.sprite.x) {
                    leader = player;
                }
            });
            if (previousLeader == leader) {
                return false;
            }
            return true;
        }
    },
    Terrain: {
        addTerrain: function (game) {
            // TODO Ova seckat ko ke e golema mapa, da se dodavat postepeno +/- edna camera
            var terrainWidth = 200;
            while (terrainWidth < game.world.width) {
                var bmdWidth = _.random(20, 100);
                var bmdHeightTop = _.random(20, 250);
                var bmdHeightBottom = _.random(200, game.world.height - bmdHeightTop) - 150;

                // top terrain
                var bmdTop = game.add.bitmapData(bmdWidth, bmdHeightTop);
                bmdTop.fill(_.random(0, 255), _.random(0, 255), _.random(0, 255));
                var spriteTop = game.add.sprite(terrainWidth + bmdWidth / 2, 0 + bmdHeightTop / 2, bmdTop);
                game.physics.p2.enable(spriteTop);
                spriteTop.body.static = true;

                terrainWidth += bmdWidth;

                var bmdBottom = game.add.bitmapData(bmdWidth, bmdHeightBottom);
                bmdBottom.fill(_.random(0, 255), _.random(0, 255), _.random(0, 255));
                var spriteBottom = game.add.sprite(terrainWidth + bmdWidth / 2, game.world.height - bmdHeightBottom / 2, bmdBottom);
                game.physics.p2.enable(spriteBottom);
                spriteBottom.body.mass = 10;

                terrainWidth += bmdWidth;
            }
        }

    }
};
