class MuddyHag extends Player {

	ChampionName = "Muddy Hag";
	private standSpr: PIXI.Sprite;
	private teleport = { InAnim: < PIXI.MovieClip > null, OutAnim: <PIXI.MovieClip>null, KeyPressCount: 0, LastKey: "", TimeoutHandle: 0 }
	private bolt = { Anim: <PIXI.MovieClip>null, V: { x: 0, y: 0 }, Dist: 0 };
	private ultimateAnim: PIXI.MovieClip;

	constructor(data: PlayerFullData, parent: PIXI.DisplayObjectContainer) {
		super(data, parent);
		this.standSpr = PIXI.Sprite.fromImage(config.Players[Champions.MuddyHag].Pic.Src);
		this.standSpr.position = new PIXI.Point(-(config.Players[0].Pic.Width - 70) / 2, -(config.Players[0].Pic.Height - 70) / 2);

		this.rotatingContainer.addChild(this.standSpr);
	
		this.teleport.InAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportIn, 0.8, false);
		this.teleport.InAnim.visible = false;
		this.rotatingContainer.addChild(this.teleport.InAnim);

		this.teleport.OutAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportOut, 0.8, false);
		this.teleport.OutAnim.visible = false;
		this.rotatingContainer.addChild(this.teleport.OutAnim);

		this.ultimateAnim = MovieClipFactory.Create(config.Players[0].Anim.Ultimate, 0.8, false);
		this.ultimateAnim.visible = false;
		this.staticContainer.addChild(this.ultimateAnim);


		this.bolt.Anim = MovieClipFactory.Create(config.Players[0].Anim.Bolt, 1.0, false);
		this.bolt.Anim.visible = false;
		this.bolt.Anim.loop = true;
		parent.addChild(this.bolt.Anim);
	}

	PerformAbility(Abidata: AbilityData, OnDone?: () => void) {
		if (Abidata.Key.search(/[QWAS]/) !== -1) {
			this.standSpr.visible = false;
			this.teleport.InAnim.visible = true;
			this.teleport.InAnim.gotoAndPlay(0);

			this.teleport.InAnim.onComplete = () => {
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

				this.teleport.InAnim.visible = false;
				this.teleport.OutAnim.visible = true;
				this.teleport.OutAnim.gotoAndPlay(0);

				this.teleport.OutAnim.onComplete = () => {
					setTimeout(() => { this.standSpr.visible = true; this.teleport.OutAnim.visible = false; }, 0);
					if (OnDone) {
						OnDone();
					}
				}
			}
		}

		if (Abidata.Key === "E") {
			this.bolt.V.x = Abidata.AddInfo.x;
			this.bolt.V.y = Abidata.AddInfo.y;

			this.bolt.Anim.x = this.PixiContainer.x - 35;
			this.bolt.Anim.y = this.PixiContainer.y - 35;

			this.bolt.Dist = 0;
			this.bolt.Anim.visible = true;
			this.bolt.Anim.gotoAndPlay(0);

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


	AbilityKeyPress(keyLetter: string, onDone: (Abidata: AbilityData) => void) {
		if (keyLetter.search(/[QWAS]/) !== -1) {

			if (this.teleport.LastKey == "") {
				this.teleport.LastKey = keyLetter;
			}

			if (this.teleport.LastKey === keyLetter) {
				this.teleport.KeyPressCount++;
			}

			if (this.teleport.KeyPressCount < 4) {
				clearTimeout(this.teleport.TimeoutHandle);
				this.teleport.TimeoutHandle = setTimeout(() => {
					var abiData = { ID: this.ID, Key: this.teleport.LastKey, AddInfo: this.teleport.KeyPressCount };

					onDone(abiData);

					this.teleport.KeyPressCount = 0;
					this.teleport.TimeoutHandle = 0;
					this.teleport.LastKey = "";
				}, 200);
			}
		}

		if (keyLetter === "E" && !this.bolt.Anim.visible) {
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
		if (this.bolt.Anim.visible) {
			this.bolt.Dist += 1 / 60;
			this.bolt.Anim.x += this.bolt.V.x / 60;
			this.bolt.Anim.y += this.bolt.V.y / 60;
			if (this.bolt.Dist > 0.5) {
				this.bolt.Anim.visible = false;
			}
		}
	}

}
