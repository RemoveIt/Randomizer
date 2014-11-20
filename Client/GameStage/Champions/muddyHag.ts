class MuddyHag extends Player {


	private standSpr: PIXI.Sprite;
	private teleportInAnim: PIXI.MovieClip;
	private teleportOutAnim: PIXI.MovieClip;

	constructor(data: PlayerFullData) {
		super(data);
		this.standSpr = PIXI.Sprite.fromImage(config.Players[Champions.MuddyHag].Picture);
		this.standSpr.position = new PIXI.Point(-(config.Players[0].PicSize.width - 70) / 2, -(config.Players[0].PicSize.height - 70) / 2);

		this.PixiContainer.addChild(this.standSpr);
		var AnimationSpeed = 0.8;
		this.teleportInAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportIn, AnimationSpeed, false);
		this.teleportInAnim.visible = false;
		this.PixiContainer.addChild(this.teleportInAnim);

		this.teleportOutAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportOut, AnimationSpeed, false);
		this.teleportOutAnim.visible = false;
		this.PixiContainer.addChild(this.teleportOutAnim);
	}

	UseAbility(keyLetter: string) {
		if (keyLetter.search(/[QWAS]/) !== -1) {
			var vec = new PIXI.Point(0, 0);
			if (keyLetter === "Q") {
				vec.x = -70;
				vec.y = -70;
			}
			if (keyLetter === "W") {
				vec.x = 70;
				vec.y = -70;
			}
			if (keyLetter === "A") {
				vec.x = -70;
				vec.y = 70;
			}
			if (keyLetter === "S") {
				vec.x = 70;
				vec.y = 70;
			}


			this.standSpr.visible = false;
			this.teleportInAnim.visible = true;
			this.teleportInAnim.gotoAndPlay(0);

			this.teleportInAnim.onComplete = () => {
				this.PixiContainer.x += vec.x;
				this.PixiContainer.y += vec.y;
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
