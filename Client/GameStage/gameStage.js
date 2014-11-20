var GameStage = (function () {
    function GameStage(socket) {
        this.ground = new Ground();
        this.objectContainer = new PIXI.DisplayObjectContainer();
        this.socket = socket;
        this.PixiStage = new PIXI.Stage(0);
        this.PixiStage.addChild(this.objectContainer);
        this.SpriteBatch = new PIXI.SpriteBatch();
        this.playerManager = new PlayersManager(this.objectContainer);
        this.playersNetwork = new PlayersNetwork(this.socket, this.playerManager);

        this.objectContainer.position.x = 50;
        this.objectContainer.position.y = 50;
    }
    GameStage.prototype.Start = function (onDone) {
        this.objectContainer.addChild(this.ground.Sprite);
        this.playersNetwork.Setup();
        this.playerManager.ReqForCurrentPlayerData(this.socket, function () {
            onDone();
        });
    };

    GameStage.prototype.Update = function () {
        this.playerManager.Update();
    };
    return GameStage;
})();
