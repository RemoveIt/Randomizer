class Ground extends PIXI.DisplayObjectContainer {
	private BackgroundSprite: PIXI.Sprite;
	private WaterAnimation: PIXI.MovieClip;

	constructor() {
		super();
		this.BackgroundSprite = PIXI.Sprite.fromImage(config.Ground.Src);

		this.WaterAnimation = MovieClipFactory.Create(config.Ground.WatarAnim, 0.12, true);
		this.WaterAnimation.anchor.x = 0;
		this.WaterAnimation.anchor.y = 0;
		this.WaterAnimation.position.x = 332;
		this.WaterAnimation.position.y = 0;
		this.WaterAnimation.play();
		this.addChild(this.BackgroundSprite);
		this.addChild(this.WaterAnimation);
	}

	SetCollision(x:number, y:number) {
	}

	FreeCollision(x:number, y:number) {
	}

	GetCollision(x: number, y: number, rot: Rotation): boolean {
		if (rot === Rotation.Up) {
			if (config.Ground.UpDownSideColl[y][x]) return true;
			else return false;
		}

		if (rot === Rotation.Right) {
			if (config.Ground.LeftRightSideColl[y][x + 1]) return true;
			else return false;
		}

		if (rot === Rotation.Down) {
			if (config.Ground.UpDownSideColl[y + 1][x]) return true;
			else return false;
		}

		if (rot === Rotation.Left) {
			if (config.Ground.LeftRightSideColl[y][x]) return true;
			else return false;
		}

		return true;
	}
}
