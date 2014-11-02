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
		});
	}

}
