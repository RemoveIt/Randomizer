class MuddyHag extends Player {

	Champion = Champions.MuddyHag;
	HP = config.Players[this.Champion].MaxHP;
	private standSpr: PIXI.Sprite;
	private teleport = new muddyHagTeleport();
	private bolt = { Anim: <PIXI.MovieClip>null, V: { x: 0, y: 0 }, Dist: 0 };
	private ultimateAnim: PIXI.MovieClip;

	constructor(data: PlayerFullData, parent: PIXI.DisplayObjectContainer, ground: Ground) {
		super(data, parent, ground);
		this.setupGraphics(data, parent);
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

	PerformAbility(Abidata: AbilityData) {
		if (this.teleport.IsRightKey(Abidata.Key)) {
			this.Busy = true;
			this.standSpr.visible = false;
			this.teleport.Start(Abidata,
				(V) => {
					this.MoveTo(this.Pos.x + V.x, this.Pos.y + V.y);
				},
				() => {
					this.standSpr.visible = true;
					this.Busy = false;
				});
		}

		if (Abidata.Key === "E") {
			this.bolt.V.x = Abidata.AddInfo.x;
			this.bolt.V.y = Abidata.AddInfo.y;

			this.bolt.Anim.x = this.PixiContainer.x - 35;
			this.bolt.Anim.y = this.PixiContainer.y - 35;

			this.bolt.Dist = 0;
			this.bolt.Anim.visible = true;
			this.bolt.Anim.gotoAndPlay(0);

		

		}

		if (Abidata.Key === "D") {
			this.ultimateAnim.visible = true;
			this.ultimateAnim.gotoAndPlay(0);
			this.ultimateAnim.onComplete = () => {
				this.ultimateAnim.visible = false;
			}
		}

	}

	AbilityKeyPress(keyLetter: string, onDone: (Abidata: AbilityData) => void) {
		if (this.teleport.IsRightKey(keyLetter)) {
			this.teleport.AbilityKeyPress(keyLetter, (abiData) => {
				abiData.ID = this.ID;
				onDone(abiData);
			});
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


	private setupGraphics(data: PlayerFullData, parent: PIXI.DisplayObjectContainer) {
		this.standSpr = PIXI.Sprite.fromImage(config.Players[Champions.MuddyHag].Pic.Src);
		this.standSpr.position = new PIXI.Point(-(config.Players[0].Pic.Width - 70) / 2, -(config.Players[0].Pic.Height - 70) / 2);

		this.rotatingContainer.addChild(this.standSpr);

		this.teleport.SetupMovieClips();
		this.rotatingContainer.addChild(this.teleport.InAnim);
		this.rotatingContainer.addChild(this.teleport.OutAnim);

		this.ultimateAnim = MovieClipFactory.Create(config.Players[0].Anim.Ultimate, 0.8, false);
		this.ultimateAnim.visible = false;
		this.rotatingContainer.addChildAt(this.ultimateAnim, 0);


		this.bolt.Anim = MovieClipFactory.Create(config.Players[0].Anim.Bolt, 1.0, false);
		this.bolt.Anim.visible = false;
		this.bolt.Anim.loop = true;
		parent.addChild(this.bolt.Anim);
	}
}
