var Game = (function () {
    function Game(canvas) {
        this.Socket = io.connect(window.location.href);
        this.Renderer = PIXI.autoDetectRenderer(1000, 800, {
            view: canvas,
            antialiasing: false,
            transparent: false,
            resolution: 1
        });

        this.GameStage = new GameStage(this.Socket);
    }
    Game.prototype.Init = function () {
        this.GameStage.Start(function () {
        });
    };

    Game.prototype.Render = function () {
        this.GameStage.Update();
        this.Renderer.render(this.GameStage.PixiStage);
    };
    return Game;
})();
