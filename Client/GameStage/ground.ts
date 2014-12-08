class Ground {
	Sprite: PIXI.Sprite;
	CollisionMap: boolean[][];
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
}
