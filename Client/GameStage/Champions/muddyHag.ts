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


	PerformAbility(Abidata: AbilityData) {
		this.Busy = true;
		this.standSpr.visible = false;
		this.teleportInAnim.visible = true;
		this.teleportInAnim.gotoAndPlay(0);
		
		this.teleportInAnim.onComplete = () => {
			if (Abidata.Key === "Q") {
				this.PixiContainer.x += -70 * Abidata.AddInfo;
				this.PixiContainer.y += -70 * Abidata.AddInfo;
			}
			if (Abidata.Key === "W") {
				this.PixiContainer.x += 70 * Abidata.AddInfo;
				this.PixiContainer.y += -70 * Abidata.AddInfo;
			}
			if (Abidata.Key === "A") {
				this.PixiContainer.x += -70 * Abidata.AddInfo;
				this.PixiContainer.y += 70 * Abidata.AddInfo;
			}
			if (Abidata.Key === "S") {
				this.PixiContainer.x += 70 * Abidata.AddInfo;
				this.PixiContainer.y += 70 * Abidata.AddInfo;
			}

			this.teleportInAnim.visible = false;
			this.teleportOutAnim.visible = true;
			this.teleportOutAnim.gotoAndPlay(0);
			this.teleportOutAnim.onComplete = () => {
				setTimeout(() => { this.standSpr.visible = true; this.teleportOutAnim.visible = false; }, 0);
				this.Busy = false;
			}
		}
	}

	private teleAbiKeyPressCount = 0;
	private teleAbiLastKey = "";
	private teleAbiTimeoutHandle = 0;

	AbilityKeyPress(keyLetter: string, onDone: (Abidata: AbilityData) => void) {
		if (keyLetter.search(/[QWAS]/) !== -1) {

			if (this.teleAbiLastKey == "") {
				this.teleAbiLastKey = keyLetter;
			}

			if (this.teleAbiLastKey === keyLetter) {
				this.teleAbiKeyPressCount++;
			}

			if (this.teleAbiKeyPressCount < 4) {
				clearTimeout(this.teleAbiTimeoutHandle);
				this.teleAbiTimeoutHandle = setTimeout(() => {
					var abiData = { ID: this.ID, Key: this.teleAbiLastKey, AddInfo: this.teleAbiKeyPressCount };

					onDone(abiData);
					this.PerformAbility(abiData);

					this.teleAbiKeyPressCount = 0;
					this.teleAbiTimeoutHandle = 0;
					this.teleAbiLastKey = "";
				}, 200);
			}
		}
	}


}
