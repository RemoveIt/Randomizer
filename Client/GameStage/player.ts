/**
 * Somewhat abstract
 */
class Player {
	ID: string;
	PixiContainer = new PIXI.DisplayObjectContainer();
	protected rotatingContainer = new PIXI.DisplayObjectContainer();
	protected staticContainer = new PIXI.DisplayObjectContainer();
	Rotation = Rotation.Up;
	Champion = Champions.None;
	MoveCooldown = 200;
	HP = 0;
	Pos = { x: 0, y: 0 };
	private hpBar: PIXI.Graphics;
	protected ground: Ground;
	constructor(data: PlayerFullData, parent: PIXI.DisplayObjectContainer, ground: Ground) {
		this.ground = ground;
		this.ID = data.ID;
		this.Pos.x = data.Pos.x;
		this.Pos.y = data.Pos.y;
		this.PixiContainer.position.x = data.Pos.x * 70 + 35;
		this.PixiContainer.position.y = data.Pos.y * 70 + 35;
		this.rotatingContainer.pivot = new PIXI.Point(35, 35);
		this.PixiContainer.addChild(this.rotatingContainer);
		this.staticContainer.pivot = new PIXI.Point(35, 35);
		this.PixiContainer.addChild(this.staticContainer);
		parent.addChild(this.PixiContainer);

		this.hpBar = new PIXI.Graphics();
		this.drawHPBar(1.0);
		this.staticContainer.addChild(this.hpBar);

		this.ground.CollisionMap[this.Pos.x][this.Pos.y] = true;
	}

	Move(movingData: MovingData) {
		this.ground.CollisionMap[this.Pos.x][this.Pos.y] = false;
		this.Pos.x = movingData.Pos.x;
		this.Pos.y = movingData.Pos.y;
		this.PixiContainer.position.x = movingData.Pos.x * 70 + 35;
		this.PixiContainer.position.y = movingData.Pos.y * 70 + 35;

		this.Rotate(movingData.Rot);
		this.ground.CollisionMap[this.Pos.x][this.Pos.y] = true;
	}

	Rotate(Rot: Rotation) {
		this.Rotation = Rot;
		this.rotatingContainer.rotation = (Rot - 1) * Math.PI / 2;
	}

	AbilityKeyPress(keyLetter: string, onDone?: (Abidata: AbilityData) => void) {
	}

	PerformAbility(abidata: AbilityData, OnDone?: () => void) {
	}

	Update() {
	}

	LoseHP(dmg: number) {
		this.HP -= dmg;
		this.drawHPBar(this.HP / 100);
	}

	private drawHPBar(hpFraction: number) {
		this.hpBar.clear();
		this.hpBar.lineStyle(6, 0x000000);
		this.hpBar.moveTo(8, 5);
		this.hpBar.lineTo(62, 5);
		this.hpBar.lineStyle(2, 0xFF0000);
		this.hpBar.moveTo(10, 5);
		this.hpBar.lineTo(10 + (50 * hpFraction), 5);
	}

	Dispose() {
		this.ground.CollisionMap[this.Pos.x][this.Pos.y] = false;
	}
}
