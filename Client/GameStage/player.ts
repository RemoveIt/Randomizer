class Player {
	ID: string;
	Sprite: PIXI.Sprite;
	MovingV: IPoint;

	constructor(data: PlayerFullData) {
		this.ID = data.ID;
		this.Sprite = PIXI.Sprite.fromImage(config.src);
		this.Sprite.position.x = data.Pos.x;
		this.Sprite.position.y = data.Pos.y;
		this.MovingV = { x: data.MovV.x, y: data.MovV.y };
	}

	Update() {
		this.Sprite.position.x += this.MovingV.x;
		this.Sprite.position.y += this.MovingV.y;

	}
}
