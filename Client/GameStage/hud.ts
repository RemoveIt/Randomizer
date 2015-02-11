class Hud extends PIXI.DisplayObjectContainer {
	private backGround: PIXI.Sprite;
	constructor() {
		super();
		this.backGround = PIXI.Sprite.fromImage(config.hudSrc);
		this.x = 700;
		this.addChild(this.backGround);
	}
}