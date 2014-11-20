var MovieClipFactory = (function () {
    function MovieClipFactory() {
    }
    MovieClipFactory.Create = function (animData, speed, loop) {
        var textures = [];

        for (var i = 1; i < animData.FrameCount + 1; i++) {
            var src = animData.Path + i.toString() + ".png";
            textures.push(PIXI.Texture.fromImage(src));
        }

        var movieClip = new PIXI.MovieClip(textures);
        movieClip.animationSpeed = speed;
        movieClip.loop = loop;
        movieClip.position = new PIXI.Point(-(animData.Size - 70) / 2, -(animData.Size - 70) / 2);
        return movieClip;
    };
    return MovieClipFactory;
})();
