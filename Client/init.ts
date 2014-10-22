window.onload = function () {
    var socket = io.connect(window.location.href);

    var canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
    var renderer = PIXI.autoDetectRenderer(800, 600, canvas);
    var stage = new PIXI.Stage(0);

    renderer.render(stage);
}
