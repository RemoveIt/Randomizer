/**
 * Somewhat abstract
 */
class Player extends PIXI.DisplayObjectContainer {
	ID: string;
	protected rotatingContainer = new PIXI.DisplayObjectContainer();
	protected staticContainer = new PIXI.DisplayObjectContainer();
	Rotation = Rotation.Up;
	Champion = Champions.None;
	MoveCooldown = 200;
	HP = 0;
	TilePos = { x: 0, y: 0 };
	Busy = false;
	private hpBar: PIXI.Graphics;
	protected ground: Ground;

	constructor(data: PlayerFullData, parent: PIXI.DisplayObjectContainer, ground: Ground) {
		super();
		this.ground = ground;
		this.ID = data.ID;
		this.TilePos.x = data.Pos.x;
		this.TilePos.y = data.Pos.y;
		this.position.x = data.Pos.x * 70 + 35;
		this.position.y = data.Pos.y * 70 + 35;
		this.rotatingContainer.pivot = new PIXI.Point(35, 35);
		this.addChild(this.rotatingContainer);
		this.staticContainer.pivot = new PIXI.Point(35, 35);
		this.addChild(this.staticContainer);
		parent.addChild(this);

		this.hpBar = new PIXI.Graphics();
		this.drawHPBar(1.0);
		this.staticContainer.addChild(this.hpBar);

		this.ground.SetCollision(this.TilePos.x, this.TilePos.y);
	}

	AbilityKeyPress(keyLetter: string, onDone?: (Abidata: AbilityData) => void) { }
	PerformAbility(abidata: AbilityData, OnDone?: () => void) { }
	Update(FPS) { }

	MoveTo(x: number, y: number) {
		this.ground.FreeCollision(this.TilePos.x, this.TilePos.y);
		this.TilePos.x = x;
		this.TilePos.y = y;
		this.position.x = this.TilePos.x * 70 + 35;
		this.position.y = this.TilePos.y * 70 + 35;
		this.ground.SetCollision(this.TilePos.x, this.TilePos.y);
	}

	Move(movingData: MovingData) {
		this.MoveTo(movingData.Pos.x, movingData.Pos.y);
		this.Rotate(movingData.Rot);
	}

	Rotate(Rot: Rotation) {
		this.Rotation = Rot;
		this.rotatingContainer.rotation = (Rot - 1) * Math.PI / 2;
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
		this.ground.FreeCollision(this.TilePos.x, this.TilePos.y);
	}
}
