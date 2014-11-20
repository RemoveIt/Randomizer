var PlayersNetwork = (function () {
    function PlayersNetwork(socket, playersManager) {
        this.socket = socket;
        this.playersManager = playersManager;
    }
    PlayersNetwork.prototype.Setup = function () {
        var _this = this;
        this.socket.on("Player", function (data) {
            if (data.Type === "New") {
                for (var i = 0; i < data.Data.length; i++) {
                    _this.playersManager.Add(data.Data[i]);
                }
            }

            if (data.Type === "Remove") {
                console.log("Delete Player");
                _this.playersManager.Remove(data.Data[0].ID);
            }

            if (data.Type === "Moving") {
                var tmpPlr = _this.playersManager.Get(data.Data[0].ID);
                tmpPlr.Move(data.Data[0]);
            }

            if (data.Type === "Ability") {
                var tmpPlr = _this.playersManager.Get(data.Data[0].ID);
                console.log(JSON.stringify(data));
                tmpPlr.UseAbility(data.Data[0].Key);
            }
        });
    };
    return PlayersNetwork;
})();
