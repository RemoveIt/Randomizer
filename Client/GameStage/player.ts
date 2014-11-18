/**
 * Somewhat abstract
 */
class Player {
	ID: string;
	PixiContainer = new PIXI.DisplayObjectContainer();
	Rotation = Rotation.Up;

	constructor(data: PlayerFullData) {
		this.ID = data.ID;
		this.PixiContainer.position.x = data.Pos.x;
		this.PixiContainer.position.y = data.Pos.y;
		this.PixiContainer.pivot = new PIXI.Point(35, 35);
	}

	Move(movingData: MovingData) {
		this.PixiContainer.position.x = movingData.Pos.x;
		this.PixiContainer.position.y = movingData.Pos.y;

		this.Rotate(movingData.Rot);
	}

	Rotate(Rot: Rotation) {
		this.Rotation = Rot;
		this.PixiContainer.rotation = Rot * Math.PI/2;
	}
	
	Update() {

	}
}
