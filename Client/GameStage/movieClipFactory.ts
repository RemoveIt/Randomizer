class MovieClipFactory {

	static Create(animData: { Path: string; FrameCount: number; Size: number },speed: number, loop: boolean): PIXI.MovieClip {
		var textures: PIXI.Texture[] = [];

		for (var i = 1; i < animData.FrameCount + 1; i++) {
			var src = animData.Path + i.toString() + ".png";
			textures.push(PIXI.Texture.fromImage(src));
		}

		var movieClip = new PIXI.MovieClip(textures);
		movieClip.animationSpeed = speed;
		movieClip.loop = loop;
		movieClip.position = new PIXI.Point(-(animData.Size - 70) / 2, -(animData.Size-70) / 2);
		return movieClip;
	}
}
