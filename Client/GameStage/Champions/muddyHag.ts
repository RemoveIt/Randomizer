class MuddyHag extends Player {

	private standSpr: PIXI.Sprite;
	private teleportInAnim: PIXI.MovieClip;
	private teleportOutAnim: PIXI.MovieClip;

	constructor(data: PlayerFullData) {
		super(data);
		this.standSpr = PIXI.Sprite.fromImage(config.Players[Champions.MuddyHag].Picture);
		this.PixiContainer.addChild(this.standSpr);
		var textures: PIXI.Texture[] = [];

		this.teleportInAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportIn);
		this.teleportInAnim.visible = false;
		this.teleportInAnim.animationSpeed = 0.5;
		this.teleportInAnim.loop = false;
		this.PixiContainer.addChild(this.teleportInAnim);

		this.teleportOutAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportOut);
		this.teleportOutAnim.visible = false;
		this.teleportOutAnim.animationSpeed = 0.5;
		this.teleportOutAnim.loop = false;
		this.PixiContainer.addChild(this.teleportOutAnim);
	}

	UseAbility(keyLetter: string) {
		if (keyLetter === 'Q') {
			this.standSpr.visible = false;
			this.teleportInAnim.visible = true;
			this.teleportInAnim.onComplete = () => {
				this.teleportInAnim.visible = false;
				this.standSpr.visible = true;
			}
			this.teleportInAnim.gotoAndPlay(0);
		}
	}
}
