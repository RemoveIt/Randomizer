class GameStage {

	PixiStage: PIXI.Stage;
	SpriteBatch: PIXI.SpriteBatch;
	private socket: SocketIOClient.Socket;
	private playerManager: PlayersManager;
	private playersNetwork: PlayersNetwork;
	private ground = new Ground();
	private objectContainer = new PIXI.DisplayObjectContainer();

	constructor(socket: SocketIOClient.Socket) {
		this.socket = socket;
		this.PixiStage = new PIXI.Stage(0);
		this.PixiStage.addChild(this.objectContainer);
		this.SpriteBatch = new PIXI.SpriteBatch();
		this.playerManager = new PlayersManager(this.objectContainer);
		this.playersNetwork = new PlayersNetwork(this.socket, this.playerManager);

		this.objectContainer.position.x = 50;
		this.objectContainer.position.y = 50;
	}

	Start(onDone: () => void) {
		this.objectContainer.addChild(this.ground.Sprite);
		this.playersNetwork.Setup();
		this.playerManager.ReqForCurrentPlayerData(this.socket, () => {
			this.objectContainer.addChild(this.playerManager.CurrPlayer.Sprite);
			onDone();
		});
	}

	Update() {
		this.playerManager.Update();
		//this.objectContainer.position.x = - this.playerManager.CurrPlayer.Sprite.position.x + 400;
		//this.objectContainer.position.y = - this.playerManager.CurrPlayer.Sprite.position.y + 300;
	}
}
