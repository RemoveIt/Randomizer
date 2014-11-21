/**
 * Somewhat abstract
 */
class Player {
	ID: string;
	PixiContainer = new PIXI.DisplayObjectContainer();
	Rotation = Rotation.Up;
	ChampionName = "None";
	MoveCooldown = 200;

	constructor(data: PlayerFullData, parent: PIXI.DisplayObjectContainer) {
		console.log(parent);
		this.ID = data.ID;
		this.PixiContainer.position.x = data.Pos.x;
		this.PixiContainer.position.y = data.Pos.y;
		this.PixiContainer.pivot = new PIXI.Point(35, 35);
		parent.addChild(this.PixiContainer);
	}

	Move(movingData: MovingData) {
		this.PixiContainer.position.x = movingData.Pos.x;
		this.PixiContainer.position.y = movingData.Pos.y;

		this.Rotate(movingData.Rot);
	}

	Rotate(Rot: Rotation) {
		this.Rotation = Rot;
		this.PixiContainer.rotation = (Rot -1) * Math.PI/2;
	}

	AbilityKeyPress(keyLetter: string, onDone?: (Abidata: AbilityData) => void) {

	}

	PerformAbility(abidata: AbilityData, OnDone?: () => void) {

	}
	
	Update() {

	}
}
