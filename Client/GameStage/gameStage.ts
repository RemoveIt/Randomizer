class GameStage {

	PixiStage: PIXI.Stage;
	SpriteBatch: PIXI.SpriteBatch;
	private socket: SocketIOClient.Socket;
	private playerManager: PlayersManager;
	private playersNetwork: PlayersNetwork;

	constructor(socket: SocketIOClient.Socket) {
		this.socket = socket;
		this.PixiStage = new PIXI.Stage(0);
		this.SpriteBatch = new PIXI.SpriteBatch();
		this.playerManager = new PlayersManager(this.PixiStage);
		this.playersNetwork = new PlayersNetwork(this.socket, this.playerManager);
	}

	Start(onDone: () => void) {
		this.playersNetwork.Setup();
		this.playerManager.ReqForCurrentPlayerData(this.socket, () => {
			this.PixiStage.addChild(this.playerManager.CurrPlayer.Sprite);
			onDone();
		});
	}

	Update() {
		this.playerManager.Update();
	}
}
