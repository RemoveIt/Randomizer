class GameStage {

	PixiStage: PIXI.Stage;
	SpriteBatch: PIXI.SpriteBatch;
	private CurrPlr: CurrentPlayer;

	constructor() {
		this.PixiStage = new PIXI.Stage(0);
		this.SpriteBatch = new PIXI.SpriteBatch();
		this.PixiStage.addChild(this.SpriteBatch);
		this.CurrPlr = new CurrentPlayer({ Pos: { x: 100, y: 100 } });
	}

	Start() {

	}
}
