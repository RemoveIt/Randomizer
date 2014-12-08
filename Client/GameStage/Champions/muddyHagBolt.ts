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

	PerformAbility(startPos: IPoint, rotation: Rotation) {
		this.V.x = Math.sin((rotation - 1) * Math.PI / 2) * 560;
		this.V.y = -Math.cos((rotation - 1) * Math.PI / 2) * 560;

		this.Anim.x = startPos.x;
		this.Anim.y = startPos.y;
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
			console.log(this.Anim.x, this.Anim.y);
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
