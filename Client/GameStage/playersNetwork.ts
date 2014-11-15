class PlayersNetwork {
	private socket: SocketIOClient.Socket;
	private playersManager: PlayersManager;

	constructor(socket: SocketIOClient.Socket, playersManager: PlayersManager) {
		this.socket = socket;
		this.playersManager = playersManager;
	}

	Setup() {
		this.socket.on("Player", (data: ServerResponse) => {
			if (data.Type === "New") {
				console.log("New Player: " + data.Data.length);
				for (var i = 0; i < data.Data.length; i++) {
					this.playersManager.Add(data.Data[i]);
				}
			}

			if (data.Type === "Remove") {
				console.log("Delete Player");
				this.playersManager.Remove(data.Data[0].ID);
			}

			if (data.Type === "Moving") {
				console.log("moving");
				var tmpPlr = this.playersManager.Get(data.Data[0].ID);
				tmpPlr.Sprite.position.x = data.Data[0].Pos.x;
				tmpPlr.Sprite.position.y = data.Data[0].Pos.y;
			}
		});
	}

}
