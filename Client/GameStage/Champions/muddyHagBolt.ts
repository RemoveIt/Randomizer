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

		this.Anim.x = muddyhag.x - 35;
		this.Anim.y = muddyhag.y - 35;
		this.Anim.visible = true;
		this.Anim.gotoAndPlay(0);
	
	}

	SetupMovieClip() {
		this.Anim = MovieClipFactory.Create(config.Players[0].Anim.Bolt, 1.0, false);
		this.Anim.visible = false;
		this.Anim.loop = true;
	}

	Update(FPS) {
		if (this.Anim.visible) {
			this.Dist += 1 / FPS;
			this.Anim.x += this.V.x / FPS;
			this.Anim.y += this.V.y / FPS;
			if (this.Dist > 0.5) {
				this.Anim.visible = false;
				this.Dist = 0;
			}
		}
	}
}
