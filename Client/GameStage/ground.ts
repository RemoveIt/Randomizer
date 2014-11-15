class Ground {
	Spritebatch = new PIXI.SpriteBatch();

	constructor() {
		for (var y = 0; y < config.groundMap.length; y++) {
			for (var x = 0; x < config.groundMap[y].length; x++) {
				var spriteIndex = config.groundMap[y][x];
				var sprite = PIXI.Sprite.fromImage(config.groundSrcs[spriteIndex]);
				sprite.position.x = x * 80;
				sprite.position.y = y * 80;

				this.Spritebatch.addChild(sprite);
			}
		}
	}
}
