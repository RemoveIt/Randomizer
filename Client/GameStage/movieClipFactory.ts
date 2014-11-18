class MovieClipFactory {

	static Create(animData: { Path: string; FrameCount: number }): PIXI.MovieClip {
		var textures: PIXI.Texture[] = [];

		for (var i = 1; i < animData.FrameCount + 1; i++) {
			var src = animData.Path + i.toString() + ".png";
			textures.push(PIXI.Texture.fromImage(src));
		}

		var movieClip = new PIXI.MovieClip(textures);

		return movieClip;
	}
}
