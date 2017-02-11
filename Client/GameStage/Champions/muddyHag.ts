class MuddyHag extends Player {
	Champion = Champions.MuddyHag;
	HP = config.Players[this.Champion].MaxHP;
	standSpr: PIXI.Sprite;
	private teleport = new muddyHagTeleport();
	private bolt = new muddyHagBolt();
	private ultimateAnim: PIXI.MovieClip;

	standRotations = {};

	constructor(data: PlayerFullData, parent: PIXI.DisplayObjectContainer, ground: Ground) {
		super(data, parent, ground);
		this.setupGraphics(data, parent);
	}

	private setupGraphics(data: PlayerFullData, parent: PIXI.DisplayObjectContainer) {

		for(var i =0;i<4;i++) {
			this.standRotations[i] = PIXI.Sprite.fromImage(config.Players[Champions.MuddyHag].Pic.Src.replace("{rotation}", Rotation[i].toLowerCase()));
			this.standRotations[i].position = new PIXI.Point(-(config.Players[0].Pic.Width - 70) / 2, -(config.Players[0].Pic.Height - 70) / 2);
		}


		this.teleport.SetupMovieClips();
		this.bolt.SetupMovieClip();
		this.rotatingContainer.addChild(this.teleport.InAnim);
		this.rotatingContainer.addChild(this.teleport.OutAnim);
		parent.addChild(this.bolt.Anim);

		this.ultimateAnim = MovieClipFactory.Create(config.Players[0].Anim.Ultimate, 0.8, false);
		this.ultimateAnim.visible = false;
		this.rotatingContainer.addChildAt(this.ultimateAnim, 0);
	}

	Update(FPS) {
		this.bolt.Update(FPS);
	}

	AbilityKeyPress(keyLetter: string, onDone: (Abidata: AbilityData) => void) {
		if (this.teleport.IsRightKey(keyLetter)) {
			this.teleport.OnKeyPress(keyLetter, (abiData) => {
				abiData.ID = this.ID;
				onDone(abiData);
				this.PerformAbility(abiData);
			});
		}

		if (this.bolt.IsRightKey(keyLetter) && this.bolt.IsReadyForNext()) {
			var abiData = this.bolt.OnKeyPress();
			abiData.ID = this.ID;
			abiData.Key = keyLetter;
			onDone(abiData);
			this.PerformAbility(abiData);
		}

		if (keyLetter === "D") {
			var abiData2 = { ID: this.ID, Key: keyLetter };
			onDone(abiData2);
			this.PerformAbility(abiData2);
		}
	}

	Rotate(Rot: Rotation): any {
		this.staticContainer.removeChild(this.standRotations[this.Rotation]);
		super.Rotate(Rot);
		this.staticContainer.addChild(this.standRotations[this.Rotation]);
	}

	PerformAbility(Abidata: AbilityData) {
		if (this.teleport.IsRightKey(Abidata.Key)) {
			this.teleport.Start(Abidata,this);
		}

		if (this.bolt.IsRightKey(Abidata.Key)) {
			this.bolt.Start(this);
		}

		if (Abidata.Key === "D") {
			this.ultimateAnim.visible = true;
			this.Busy = true;
			this.ultimateAnim.gotoAndPlay(0);
			this.ultimateAnim.onComplete = () => {
				this.Busy = false;
				this.ultimateAnim.visible = false;
			}
		}
	}
}
