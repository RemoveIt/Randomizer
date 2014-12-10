class muddyHagBolt {
	Anim: PIXI.MovieClip;
	private V = { x: 0, y: 0 };
	private Dist = 0;

	IsRightKey(key: string):boolean {
		return key === "E";
	}

	IsReadyForNext(): boolean {
		return this.Dist === 0;
	}

	OnKeyPress(): AbilityData {
		var abiData = { ID: "", Key: "" };
		return abiData;
	}

	Start(muddyhag : MuddyHag) {
		this.V.x = Math.sin((muddyhag.Rotation - 1) * Math.PI / 2) * 560;
		this.V.y = -Math.cos((muddyhag.Rotation - 1) * Math.PI / 2) * 560;

		this.Anim.x = muddyhag.PixiContainer.x - 35;
		this.Anim.y = muddyhag.PixiContainer.y - 35;
		this.Anim.visible = true;
		this.Anim.gotoAndPlay(0);
	
	}

	SetupMovieClip() {
		this.Anim = MovieClipFactory.Create(config.Players[0].Anim.Bolt, 1.0, false);
		this.Anim.visible = false;
		this.Anim.loop = true;
	}

	Update() {
		if (this.Anim.visible) {
			this.Dist += 1 / 60;
			this.Anim.x += this.V.x / 60;
			this.Anim.y += this.V.y / 60;
			if (this.Dist > 0.5) {
				this.Anim.visible = false;
				this.Dist = 0;
			}
		}
	}
}
