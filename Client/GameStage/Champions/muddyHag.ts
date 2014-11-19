class MuddyHag extends Player {

	private standSpr: PIXI.Sprite;
	private teleportInAnim: PIXI.MovieClip;
	private teleportOutAnim: PIXI.MovieClip;

	constructor(data: PlayerFullData) {
		super(data);
		this.standSpr = PIXI.Sprite.fromImage(config.Players[Champions.MuddyHag].Picture);
		this.PixiContainer.addChild(this.standSpr);
		var textures: PIXI.Texture[] = [];

		this.teleportInAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportIn, 0.5, false);
		this.teleportInAnim.visible = false;
		this.PixiContainer.addChild(this.teleportInAnim);

		this.teleportOutAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportOut, 0.5, false);
		this.teleportOutAnim.visible = false;
		this.PixiContainer.addChild(this.teleportOutAnim);
	}

	UseAbility(keyLetter: string) {
		if (keyLetter === 'Q') {
			this.standSpr.visible = false;
			this.teleportInAnim.visible = true;
			this.teleportInAnim.play();

			this.teleportInAnim.onComplete = () => {
				this.teleportInAnim.visible = false;

				this.PixiContainer.position.x += 140;
				this.teleportOutAnim.visible = true;
				this.teleportOutAnim.gotoAndPlay(0);
				this.teleportOutAnim.onComplete = () => {
					this.teleportOutAnim.visible = false;
					setTimeout(() => { this.standSpr.visible = true; }, 0);
				}
			}
		}
	}
}
