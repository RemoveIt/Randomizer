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
				for (var i = 0; i < data.Data.length; i++) {
					this.playersManager.Add(data.Data[i]);
				}
			}

			if (data.Type === "Remove") {
				console.log("Delete Player");
				this.playersManager.Remove(data.Data[0].ID);
			}

			if (data.Type === "Moving") {
				var tmpPlr = this.playersManager.Get(data.Data[0].ID);
				tmpPlr.Move(data.Data[0]);
			}

			if (data.Type === "Ability") {
				var tmpPlr = this.playersManager.Get(data.Data[0].ID);
				console.log(JSON.stringify(data));
				tmpPlr.UseAbility(data.Data[0].Key);
			}
		});
	}

}
