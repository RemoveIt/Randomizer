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

	GetCollision(x, y): boolean {
		if (x < 0 || y < 0) return true;
		if (x > this.CollisionMap.length -1 || y > this.CollisionMap[0].length - 1) return true;
		return this.CollisionMap[x][y];
	}
}
