class GameStage {

	PixiStage: PIXI.Stage;
	private socket: SocketIOClient.Socket;
	private playerGroup: PlayersGroup;
	private playersNetwork: PlayersNetwork;
	private ground = new Ground();
	private objectContainer = new PIXI.DisplayObjectContainer();
	private hud = new Hud();

	constructor(socket: SocketIOClient.Socket) {
		this.socket = socket;
		this.PixiStage = new PIXI.Stage(0);
		this.PixiStage.addChild(this.objectContainer);
		this.playerGroup = new PlayersGroup(this.objectContainer, this.ground);
		this.playersNetwork = new PlayersNetwork(this.socket, this.playerGroup);
		
	}

	Start(onDone: () => void) {
		this.objectContainer.addChild(this.ground.BackgroundSprite);
		this.objectContainer.addChild(this.ground.WaterAnimation);
		this.ground.WaterAnimation.play();
		this.objectContainer.addChild(this.hud.PixiContainer);
		this.playersNetwork.Setup();
		this.playerGroup.ReqForCurrentPlayerData(this.socket, () => {
			onDone();
		});
	}

	Update(FPS: number) {
		this.playerGroup.Update(FPS);
	}
}
