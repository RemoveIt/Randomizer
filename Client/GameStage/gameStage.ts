class GameStage {

	PixiStage: PIXI.Stage;
	private socket: SocketIOClient.Socket;
	private playerManager: PlayersGroup;
	private playersNetwork: PlayersNetwork;
	private ground = new Ground();
	private objectContainer = new PIXI.DisplayObjectContainer();
	private hud = new Hud();

	constructor(socket: SocketIOClient.Socket) {
		this.socket = socket;
		this.PixiStage = new PIXI.Stage(0);
		this.PixiStage.addChild(this.objectContainer);
		this.playerManager = new PlayersGroup(this.objectContainer, this.ground);
		this.playersNetwork = new PlayersNetwork(this.socket, this.playerManager);
		
	}

	Start(onDone: () => void) {
		this.objectContainer.addChild(this.ground.Sprite);
		this.objectContainer.addChild(this.hud.PixiContainer);
		this.playersNetwork.Setup();
		this.playerManager.ReqForCurrentPlayerData(this.socket, () => {
			onDone();
		});
	}

	Update() {
		this.playerManager.Update();
	}
}
