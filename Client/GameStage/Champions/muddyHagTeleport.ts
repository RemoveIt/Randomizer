class muddyHagTeleport {
	InAnim: PIXI.MovieClip;
	OutAnim: PIXI.MovieClip;
	private KeyPressCount = 0;
	private LastKey = "";
	private TimeoutHandle = 0;

	IsRightKey(key: string): boolean {
		return key.search(/[QWAS]/) !== -1
	}

	SetupMovieClips() {
		this.InAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportIn, 0.8, false);
		this.InAnim.visible = false;
		this.OutAnim = MovieClipFactory.Create(config.Players[0].Anim.TeleportOut, 0.8, false);
		this.OutAnim.visible = false;
	}

	OnKeyPress(CurrentKey: string, OnSuccess: (abiData: AbilityData) => void) {
		if (this.LastKey == "") {
			this.LastKey = CurrentKey;
		}

		if (this.LastKey === CurrentKey) {
			this.KeyPressCount++;
		}

		if (this.KeyPressCount < 4) {
			clearTimeout(this.TimeoutHandle);
			this.TimeoutHandle = setTimeout(() => {
				var abiData = { ID: "", Key: this.LastKey, AddInfo: this.KeyPressCount };
				OnSuccess(abiData);

				this.KeyPressCount = 0;
				this.TimeoutHandle = 0;
				this.LastKey = "";
			}, 200);
		}
	}

	Start(Abidata: AbilityData, muddyHag: MuddyHag) {
		muddyHag.Busy = true;
		muddyHag.standSpr.visible = false;
		this.InAnim.visible = true;
		this.InAnim.gotoAndPlay(0);

		this.InAnim.onComplete = () => {
			var tmpV = this.GetMoveVByKey(Abidata.Key, Abidata.AddInfo);
			muddyHag.MoveTo(tmpV.x, tmpV.y);
			this.InAnim.visible = false;
			this.OutAnim.visible = true;
			this.OutAnim.gotoAndPlay(0);

			this.OutAnim.onComplete = () => {
				setTimeout(() => {
					muddyHag.standSpr.visible = true;
					muddyHag.Busy = false;
					this.OutAnim.visible = false;
				}, 0);
			}
		}
	}

	private GetMoveVByKey(key: string, length: number): IPoint {
		var tmpV = { x: 0, y: 0 };
		if (key === "Q") {
			tmpV.x += -length;
			tmpV.y += -length;
		}
		if (key === "W") {
			tmpV.x += length;
			tmpV.y += -length;
		}
		if (key === "A") {
			tmpV.x += -length;
			tmpV.y += length;
		}
		if (key === "S") {
			tmpV.x += length;
			tmpV.y += length;
		}
		return tmpV;
	}
}
