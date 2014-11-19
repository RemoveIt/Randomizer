class MovieClipFactory {

	static Create(animData: { Path: string; FrameCount: number },speed: number, loop: boolean): PIXI.MovieClip {
		var textures: PIXI.Texture[] = [];

		for (var i = 1; i < animData.FrameCount + 1; i++) {
			var src = animData.Path + i.toString() + ".png";
			textures.push(PIXI.Texture.fromImage(src));
		}

		var movieClip = new PIXI.MovieClip(textures);
		movieClip.animationSpeed = speed;
		movieClip.loop = loop;
		return movieClip;
	}
}
