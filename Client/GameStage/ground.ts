class Ground {
	Sprite: PIXI.Sprite;
	private CollisionMap: boolean[][];
	constructor() {
		this.Sprite = PIXI.Sprite.fromImage(config.Ground.Src);
		this.CollisionMap = new Array<boolean[]>(config.Ground.Size.x);
		for (var i = 0; i < config.Ground.Size.x; i++) {
			this.CollisionMap[i] = new Array<boolean>(config.Ground.Size.y);
		}
	}

	SetCollision(x, y) {
		this.CollisionMap[x][y] = true;
	}

	FreeCollision(x, y) {
		this.CollisionMap[x][y] = false;
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
