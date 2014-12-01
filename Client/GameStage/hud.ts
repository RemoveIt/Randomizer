class Hud {

	PixiContainer = new PIXI.DisplayObjectContainer();
	private backGround: PIXI.Sprite;
	constructor() {
		this.backGround = PIXI.Sprite.fromImage(config.hudSrc);
		this.PixiContainer.x = 700;
		this.PixiContainer.addChild(this.backGround);
	}
}