class Player {
	ID: string;
	Sprite: PIXI.Sprite;
	Rotation = Rotation.Up;

	constructor(data: PlayerFullData) {
		this.ID = data.ID;
		this.Sprite = PIXI.Sprite.fromImage(config.Players[0].Picture);
		this.Sprite.position.x = data.Pos.x;
		this.Sprite.position.y = data.Pos.y;
		this.Sprite.pivot = new PIXI.Point(35, 35);
	}

	Move(movingData: MovingData) {
		this.Sprite.position.x = movingData.Pos.x;
		this.Sprite.position.y = movingData.Pos.y;

		this.Rotate(movingData.Rot);
	}

	Rotate(Rot: Rotation) {
		this.Rotation = Rot;
		this.Sprite.rotation = Rot * Math.PI/2;
	}
	
	Update() {

	}
}
