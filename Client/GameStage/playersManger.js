var PlayersManager = (function () {
    function PlayersManager(stage) {
        this.List = [];
        this.PixiStage = stage;
    }
    PlayersManager.prototype.Add = function (data) {
        var newPlr = new MuddyHag(data);
        this.List.push(newPlr);
        this.PixiStage.addChild(newPlr.PixiContainer);
    };

    PlayersManager.prototype.Get = function (ID) {
        for (var i = 0; i < this.List.length; i++) {
            if (ID == this.List[i].ID) {
                return this.List[i];
            }
        }
        return null;
    };

    PlayersManager.prototype.Remove = function (ID) {
        for (var i = 0; i < this.List.length; i++) {
            if (this.List[i].ID === ID) {
                this.PixiStage.removeChild(this.List[i].PixiContainer);
                this.List.splice(i, 1);
            }
        }
    };

    PlayersManager.prototype.Update = function () {
        for (var i = 0; i < this.List.length; i++) {
            this.List[i].Update();
        }
    };

    PlayersManager.prototype.ReqForCurrentPlayerData = function (socket, onDone) {
        var _this = this;
        socket.on("FirstPlayer", function (data) {
            _this.CurrPlayer = new CurrentPlayer(new MuddyHag(data.Data[0]), socket);
            _this.List.push(_this.CurrPlayer.player);
            _this.PixiStage.addChild(_this.CurrPlayer.player.PixiContainer);
            onDone();
        });
    };
    return PlayersManager;
})();
