class Player {
	Sprite: PIXI.Sprite;
	constructor(data: PlayerData) {

		this.Sprite = PIXI.Sprite.fromImage(config.src);
		this.Sprite.position.x = data.Pos.x;
		this.Sprite.position.y = data.Pos.y;
		
	}
}
