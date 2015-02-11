class GameStage extends PIXI.Stage {

	private socket: SocketIOClient.Socket;
	private playerGroup: PlayersGroup;
	private playersNetwork: PlayersNetwork;
	private ground = new Ground();
	private objectContainer = new PIXI.DisplayObjectContainer();
	private hud = new Hud();

	constructor(socket: SocketIOClient.Socket) {
		super(0);
		this.socket = socket;
		this.addChild(this.objectContainer);
		this.playerGroup = new PlayersGroup(this.objectContainer, this.ground);
		this.playersNetwork = new PlayersNetwork(this.socket, this.playerGroup);
		
	}

	Start(onDone: () => void) {
		this.objectContainer.addChild(this.ground);
		this.objectContainer.addChild(this.hud);
		this.playersNetwork.Setup();
		this.playerGroup.ReqForCurrentPlayerData(this.socket, () => {
			onDone();
		});
	}

	Update(FPS: number) {
		this.playerGroup.Update(FPS);
	}
}
