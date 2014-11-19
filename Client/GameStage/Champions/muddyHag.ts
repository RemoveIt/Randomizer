class MuddyHag extends Player {

	private standSpr: PIXI.Sprite;
	private teleportInAnim: PIXI.MovieClip;
	private teleportOutAnim: PIXI.MovieClip;

	constructor(data: PlayerFullData) {
		super(data);
		this.standSpr = PIXI.Sprite.fromImage(config.Players[Champions.MuddyHag].Picture);
		this.standSpr.position = new PIXI.Point(-(config.Players[0].PicSize.width - 70) / 2, -(config.Players[0].PicSize.height - 70) / 2);

		this.PixiContainer.addChild(this.standSpr);
		this.teleportInAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportIn, 0.4, false);
		this.teleportInAnim.visible = false;
		this.PixiContainer.addChild(this.teleportInAnim);

		this.teleportOutAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportOut, 0.4, false);
		this.teleportOutAnim.visible = false;
		this.PixiContainer.addChild(this.teleportOutAnim);
	}

	UseAbility(keyLetter: string) {
		if (keyLetter === 'Q') {
			this.standSpr.visible = false;
			this.teleportInAnim.visible = true;
			this.teleportInAnim.gotoAndPlay(0);

			this.teleportInAnim.onComplete = () => {
				this.PixiContainer.x += 140;
				this.teleportInAnim.visible = false;
				this.teleportOutAnim.visible = true;
				this.teleportOutAnim.gotoAndPlay(0);
				this.teleportOutAnim.onComplete = () => {
					setTimeout(() => { this.standSpr.visible = true; this.teleportOutAnim.visible = false; }, 0);
				}
			}
		}
	}
}
