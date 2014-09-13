var RaceGame = {
    Bird: function(game, name, button) {
        this.game = game;
        this.name = name;

        this.preload = function() {
            game.load.spritesheet('bird', 'assets/flappy/bird.png', 34, 24, 3);
        };
        this.create = function() {
            this.sprite = game.add.sprite(100, game.world.height / 2, 'bird');
            this.sprite.animations.add('flap');
            game.physics.p2.enable(this.sprite);
            
            this.sprite.body.clearShapes();
            this.sprite.body.addCircle(18);

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
    CurrentGame: function(game) {
        var players = [];
        var leader;

        this.addPlayer = function(bird) {
            bird.preload();
            players.push(bird);
        };
        this.createAll = function() {
            _.each(players, function(player) {
                player.create();
            });
        };
        
        // update methods
        this.updateCamera = function() {
            if (updateLeader()) {
                game.camera.follow(leader.sprite, Phaser.Camera.FOLLOW_TOPDOWN);
            }
        };
        this.checkPlayerOutOfCamera = function () {
            _.each(players, function(player) {
                if(!player.sprite.inCamera) {
                    player.sprite.destroy();
                    players = _.without(players, player);
                }
            });
        }
        this.checkGameEnd = function() {
            if(players.length < 2) {
                updateLeader();
                RaceGame.OverlayUI.showGameEndUI(leader);
            }
        }

        function updateLeader() {
            // true - leader has changed
            if (!leader) {
                leader = players[0];
                return true;
            }
            var previousLeader = leader;
            _.each(players, function(player) {
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
        addTerrain: function(game) {
            var terrainWidth = 200;
            var lastBlock = {}

            while (terrainWidth < game.world.width) {
                var topOrBottom = _.random(1, 2) // 1 == top ; 2 == bottom
                var bmdWidth, bmdHeight;

                bmdWidth = 65;
                if (_.isUndefined(lastBlock.height) || lastBlock.topOrBottom == topOrBottom) {
                    // first block || same position (both top or bottom)
                    bmdHeight = _.random(50, game.world.height - 150);
                    lastBlock.height = bmdHeight;
                    lastBlock.topOrBottom = topOrBottom;
                }
                else {
                    // different position top+bottom < lastBlock.height - 150 so there is no immpasable terrain
                    bmdHeight = _.random(50, game.world.height - lastBlock.height - 150);
                    lastBlock.height = bmdHeight;
                    lastBlock.topOrBottom = topOrBottom;
                }


                // terrain bitmap data
                var bmd = game.add.bitmapData(bmdWidth, bmdHeight);
                bmd.fill(_.random(0, 255), _.random(0, 255), _.random(0, 255));

                if (topOrBottom == 1) {
                    var spriteTop = game.add.sprite(terrainWidth + bmdWidth / 2, 0 + bmdHeight / 2, bmd);
                    game.physics.p2.enable(spriteTop);
                    spriteTop.body.static = true;
                }
                else {
                    var spriteBottom = game.add.sprite(terrainWidth + bmdWidth / 2, game.world.height - bmdHeight / 2, bmd);
                    game.physics.p2.enable(spriteBottom);
                    if(bmdHeight > 150) {
                        spriteBottom.body.static = true;
                    }
                }

                terrainWidth += bmdWidth;

                /*
                var bmdBottom = game.add.bitmapData(bmdWidth, bmdHeightBottom);
                bmdBottom.fill(_.random(0, 255), _.random(0, 255), _.random(0, 255));
                var spriteBottom = game.add.sprite(terrainWidth + bmdWidth / 2, game.world.height - bmdHeightBottom / 2, bmdBottom);
                game.physics.p2.enable(spriteBottom);
                spriteBottom.body.mass = 10;

                terrainWidth += bmdWidth;
                */
            }
        }
    },
    OverlayUI: {
        container: $('.canvas-overlay'),
        showStartUI: function () {
            var ovCont = this.container;
            
            var startGameBtn = $('<div class="btn btn-default">Start game</div>');
            ovCont.append(startGameBtn);
            
            startGameBtn.click(function () {
                startGameBtn.remove();
                ovCont.hide();
                game.paused = false;
            })
        },
        showGameEndUI: function (leader) {
            var ovCont = this.container;
            game.paused = true;
            ovCont.show();
            
            var gameWinnerTxt = $('<h1 style="color: #fff;"></h1>');
            
            gameWinnerTxt.text(leader.name + ' won!!')
            ovCont.append(gameWinnerTxt);
        }
    }
};
