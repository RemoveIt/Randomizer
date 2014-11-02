class PlayersManager {

	List: Player[] = [];
	CurrPlayer: CurrentPlayer;
	private PixiStage: PIXI.Stage;

	constructor(stage: PIXI.Stage) {
		this.PixiStage = stage;
	}

	Add(data:PlayerFullData) {
		var newPlr = new Player(data);
		this.List.push(newPlr);
		this.PixiStage.addChild(newPlr.Sprite);
	}

	Get(ID: string): Player {
		for (var i = 0; i < this.List.length; i++) {
			if (ID == this.List[i].ID) {
				return this.List[i];
			}
		}
		return null;
	}


	Remove(ID: string) {
		for (var i = 0; i < this.List.length; i++) {
			if (this.List[i].ID === ID) {
				this.PixiStage.removeChild(this.List[i].Sprite);
				this.List.splice(i, 1);
			}
		}
	}

	Update() {
		for (var i = 0; i < this.List.length; i++) {
			this.List[i].Update();
		}
	}

	ReqForCurrentPlayerData(socket: SocketIOClient.Socket, onDone: () => void) {
		socket.on("FirstPlayer", (data: ServerResponse) => {
			this.CurrPlayer = new CurrentPlayer(data.Data[0],socket);
			this.List.push(this.CurrPlayer);
			onDone();
		});
	}

}
