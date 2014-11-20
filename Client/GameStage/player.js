var Player = (function () {
    function Player(data) {
        this.PixiContainer = new PIXI.DisplayObjectContainer();
        this.Rotation = 1 /* Up */;
        this.ID = data.ID;
        this.PixiContainer.position.x = data.Pos.x;
        this.PixiContainer.position.y = data.Pos.y;
        this.PixiContainer.pivot = new PIXI.Point(35, 35);
    }
    Player.prototype.Move = function (movingData) {
        this.PixiContainer.position.x = movingData.Pos.x;
        this.PixiContainer.position.y = movingData.Pos.y;

        this.Rotate(movingData.Rot);
    };

    Player.prototype.Rotate = function (Rot) {
        this.Rotation = Rot;
        this.PixiContainer.rotation = (Rot - 1) * Math.PI / 2;
    };

    Player.prototype.UseAbility = function (abilityLetter) {
    };

    Player.prototype.Update = function () {
    };
    return Player;
})();
