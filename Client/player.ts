class Player {

	 Pos: PIXI.Point;

	constructor(data: PlayerData) {
		this.Pos = new PIXI.Point(data.Pos.x, data.Pos.y);
	}
}
