class GameStage {

	PixiStage: PIXI.Stage;
	SpriteBatch: PIXI.SpriteBatch;
	private CurrPlr: CurrentPlayer;

	constructor(socket: SocketIOClient.Socket) {
		this.PixiStage = new PIXI.Stage(0);
		this.SpriteBatch = new PIXI.SpriteBatch();

		socket.on("NewPlayer", (data: ServerResponse) => {
			this.CurrPlr = new CurrentPlayer(data.Data);
			this.PixiStage.addChild(this.CurrPlr.Sprite);
		});

	}

	Start() {

	}

	Update() {
		this.CurrPlr.Update();
	}
}
