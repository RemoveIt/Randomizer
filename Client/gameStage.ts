class GameStage {

	PixiStage: PIXI.Stage;
	SpriteBatch: PIXI.SpriteBatch;
	private CurrPlr: CurrentPlayer;

	constructor() {
		this.PixiStage = new PIXI.Stage(0);
		this.SpriteBatch = new PIXI.SpriteBatch();
		this.CurrPlr = new CurrentPlayer({ Pos: { x: 100, y: 100 }, MovV: { x:0, y:0 } });
		this.PixiStage.addChild(this.CurrPlr.Sprite);
	}

	Start() {

	}

	Update() {
		this.CurrPlr.Update();
	}
}
