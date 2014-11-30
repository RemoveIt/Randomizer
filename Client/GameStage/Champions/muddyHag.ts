class MuddyHag extends Player {

	ChampionName = "Muddy Hag";
	private standSpr: PIXI.Sprite;
	private teleportInAnim: PIXI.MovieClip;
	private teleportOutAnim: PIXI.MovieClip;
	private boltAnim: PIXI.MovieClip; // TODO put all properities of bolt into single object
	private ultimateAnim: PIXI.MovieClip;

	constructor(data: PlayerFullData, parent: PIXI.DisplayObjectContainer) {
		super(data, parent);
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

		this.ultimateAnim = MovieClipFactory.Create(config.Players[0].Anim.Ultimate, AnimationSpeed, false);
		this.ultimateAnim.visible = false;
		this.PixiContainer.addChild(this.ultimateAnim);


		this.boltAnim = MovieClipFactory.Create(config.Players[0].Anim.Bolt, 1.0, false);
		this.boltAnim.visible = false;
		this.boltAnim.loop = true;
		parent.addChild(this.boltAnim);
	}

	private boltV = new PIXI.Point(0, 0);
	private boltDist = 0;

	PerformAbility(Abidata: AbilityData, OnDone?: () => void) {
		if (Abidata.Key.search(/[QWAS]/) !== -1) {
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
					if (OnDone) {
						OnDone();
					}
				}
			}
		}

		if (Abidata.Key === "E") {
			this.boltV.x = Abidata.AddInfo.x;
			this.boltV.y = Abidata.AddInfo.y;

			this.boltAnim.x = this.PixiContainer.x - 35;
			this.boltAnim.y = this.PixiContainer.y - 35;

			this.boltDist = 0;
			this.boltAnim.visible = true;
			this.boltAnim.gotoAndPlay(0);

			if (OnDone) {
				OnDone();
			}

		}

		if (Abidata.Key === "D") {
			this.ultimateAnim.visible = true;
			this.ultimateAnim.gotoAndPlay(0);
			this.ultimateAnim.onComplete = () => {
				this.ultimateAnim.visible = false;
				if (OnDone) {
					OnDone();
				}
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

					this.teleAbiKeyPressCount = 0;
					this.teleAbiTimeoutHandle = 0;
					this.teleAbiLastKey = "";
				}, 200);
			}
		}

		if (keyLetter === "E" && !this.boltAnim.visible) {
			//magic
			var tmpX = Math.sin((this.Rotation - 1) * Math.PI / 2) * 560;
			var tmpY = -Math.cos((this.Rotation - 1) * Math.PI / 2) * 560;
			var abiData = { ID: this.ID, Key: keyLetter, AddInfo: { x: tmpX, y: tmpY } };

			onDone(abiData);
		}

		if (keyLetter === "D") {
			var abiData2 = { ID: this.ID, Key: keyLetter };
			onDone(abiData2);
		}
	}

	Update() {
		if (this.boltAnim.visible) {
			this.boltDist += 1 / 60;
			this.boltAnim.x += this.boltV.x / 60;
			this.boltAnim.y += this.boltV.y / 60;
			if (this.boltDist > 0.5) {
				this.boltAnim.visible = false;
			}
		}
	}

}
