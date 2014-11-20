var CurrentPlayer = (function () {
    function CurrentPlayer(plr, socket) {
        this.lastKeyTime = 0;
        this.player = plr;
        KeyboardManager.AddListener(this);
        this.socket = socket;
    }
    CurrentPlayer.prototype.OnKeyPress = function (keyCode) {
        if (Date.now() - this.lastKeyTime < 200) {
            return;
        }

        if (keyCode >= 37 && keyCode <= 40) {
            this.checkArrowKeys(keyCode);
        }

        if (keyCode === 81) {
            this.socket.emit("Player", {
                Type: "Ability", Data: [{ ID: this.player.ID, Key: "Q" }]
            });
            this.player.UseAbility("Q");
        }

        this.lastKeyTime = Date.now();
    };

    CurrentPlayer.prototype.checkArrowKeys = function (keyCode) {
        if (keyCode === 37) {
            this.player.PixiContainer.position.x -= 70;
        }
        if (keyCode === 38) {
            this.player.PixiContainer.position.y -= 70;
        }
        if (keyCode === 39) {
            this.player.PixiContainer.position.x += 70;
        }
        if (keyCode === 40) {
            this.player.PixiContainer.position.y += 70;
        }

        this.player.Rotate(keyCode - 37);
        this.socket.emit("Player", {
            Type: "Moving", Data: [{
                    ID: this.player.ID,
                    Pos: { x: this.player.PixiContainer.position.x, y: this.player.PixiContainer.position.y },
                    Rot: this.player.Rotation
                }]
        });
    };

    CurrentPlayer.prototype.OnKeyRelease = function (keyCode) {
    };
    return CurrentPlayer;
})();
