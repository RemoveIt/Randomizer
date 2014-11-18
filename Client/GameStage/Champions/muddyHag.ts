class MuddyHag extends Player {

	constructor(data: PlayerFullData) {
		super(data);
		var muddySpr = PIXI.Sprite.fromImage(config.Players[0].Picture);
		this.PixiContainer.addChild(muddySpr);

	}
}