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

	Start(Abidata: AbilityData, OnMoveRequest: (V: IPoint) => void, OnAllDone: () => void) {
		this.InAnim.visible = true;
		this.InAnim.gotoAndPlay(0);

		this.InAnim.onComplete = () => {
			var tmpV = { x: 0, y: 0 };
			if (Abidata.Key === "Q") {
				tmpV.x += -Abidata.AddInfo;
				tmpV.y += -Abidata.AddInfo;
			}
			if (Abidata.Key === "W") {
				tmpV.x += Abidata.AddInfo;
				tmpV.y += -Abidata.AddInfo;
			}
			if (Abidata.Key === "A") {
				tmpV.x += -Abidata.AddInfo;
				tmpV.y += Abidata.AddInfo;
			}
			if (Abidata.Key === "S") {
				tmpV.x += Abidata.AddInfo;
				tmpV.y += Abidata.AddInfo;
			}

			OnMoveRequest(tmpV);
			this.InAnim.visible = false;
			this.OutAnim.visible = true;
			this.OutAnim.gotoAndPlay(0);

			this.OutAnim.onComplete = () => {
				setTimeout(() => {
					OnAllDone();
					this.OutAnim.visible = false;
				}, 0);
			}
		}
	}
}
