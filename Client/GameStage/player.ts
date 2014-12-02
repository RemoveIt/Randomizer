﻿/**
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

	private hpBar: PIXI.Graphics;

	constructor(data: PlayerFullData, parent: PIXI.DisplayObjectContainer) {
		this.ID = data.ID;
		this.PixiContainer.position.x = data.Pos.x;
		this.PixiContainer.position.y = data.Pos.y;
		this.rotatingContainer.pivot = new PIXI.Point(35, 35);
		this.PixiContainer.addChild(this.rotatingContainer);
		this.staticContainer.pivot = new PIXI.Point(35, 35);
		this.PixiContainer.addChild(this.staticContainer);
		parent.addChild(this.PixiContainer);

		this.hpBar = new PIXI.Graphics();
		this.drawHPBar(1.0);
		this.staticContainer.addChild(this.hpBar);
	}

	Move(movingData: MovingData) {
		this.PixiContainer.position.x = movingData.Pos.x;
		this.PixiContainer.position.y = movingData.Pos.y;

		this.Rotate(movingData.Rot);
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
}
