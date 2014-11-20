class MuddyHag extends Player {

	ChampionName = "Muddy Hag";
	private standSpr: PIXI.Sprite;
	private teleportInAnim: PIXI.MovieClip;
	private teleportOutAnim: PIXI.MovieClip;

	constructor(data: PlayerFullData) {
		super(data);
		this.standSpr = PIXI.Sprite.fromImage(config.Players[Champions.MuddyHag].Pic.Src);
		this.standSpr.position = new PIXI.Point(-(config.Players[0].Pic.Width - 70) / 2, -(config.Players[0].Pic.Height - 70) / 2);

		this.PixiContainer.addChild(this.standSpr);
		var AnimationSpeed = 0.8;
		this.teleportInAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportIn, AnimationSpeed, false);
		this.teleportInAnim.visible = false;
		this.PixiContainer.addChild(this.teleportInAnim);

		this.teleportOutAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportOut, AnimationSpeed, false);
		this.teleportOutAnim.visible = false;
		this.PixiContainer.addChild(this.teleportOutAnim);
	}

	private teleAbiKeyPressCount = 0;
	private teleAbiLastKey = "";
	private teleAbiTimeoutHandle = 0;

	AbilityKeyPress(keyLetter: string, onDone?: () => void) {
		if (keyLetter.search(/[QWAS]/) !== -1) {

			if (this.teleAbiLastKey == "") {
				this.teleAbiLastKey = keyLetter;
			}

			if (this.teleAbiLastKey === keyLetter) {
				this.teleAbiKeyPressCount++;
			}

			if (this.teleAbiKeyPressCount < 4) {
				this.teleport(onDone);
			}
		}
	}


	private teleport(onDone?: () => void) {
		clearTimeout(this.teleAbiTimeoutHandle);
		this.teleAbiTimeoutHandle = setTimeout(() => {
			if (onDone) {
				onDone();
			}
			this.Busy = true;
			this.standSpr.visible = false;
			this.teleportInAnim.visible = true;
			this.teleportInAnim.gotoAndPlay(0);

			this.teleportInAnim.onComplete = () => {
				if (this.teleAbiLastKey === "Q") {
					this.PixiContainer.x += -70 * this.teleAbiKeyPressCount;
					this.PixiContainer.y += -70 * this.teleAbiKeyPressCount;
				}
				if (this.teleAbiLastKey === "W") {
					this.PixiContainer.x += 70 * this.teleAbiKeyPressCount;
					this.PixiContainer.y += -70 * this.teleAbiKeyPressCount;
				}
				if (this.teleAbiLastKey === "A") {
					this.PixiContainer.x += -70 * this.teleAbiKeyPressCount;
					this.PixiContainer.y += 70 * this.teleAbiKeyPressCount;
				}
				if (this.teleAbiLastKey === "S") {
					this.PixiContainer.x += 70 * this.teleAbiKeyPressCount;
					this.PixiContainer.y += 70 * this.teleAbiKeyPressCount;
				}

				this.teleportInAnim.visible = false;
				this.teleportOutAnim.visible = true;
				this.teleportOutAnim.gotoAndPlay(0);
				this.teleportOutAnim.onComplete = () => {
					setTimeout(() => { this.standSpr.visible = true; this.teleportOutAnim.visible = false; }, 0);
					this.Busy = false;

					this.teleAbiKeyPressCount = 0;
					this.teleAbiTimeoutHandle = 0;
					this.teleAbiLastKey = "";

				}
			}
		}, 200);
	}
}
