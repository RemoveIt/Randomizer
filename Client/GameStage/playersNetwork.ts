class PlayersNetwork {
	private socket: SocketIOClient.Socket;
	private playersManager: PlayersManager;
	private ground: Ground;

	constructor(socket: SocketIOClient.Socket, playersManager: PlayersManager, ground: Ground) {
		this.socket = socket;
		this.playersManager = playersManager;
		this.ground = ground;
	}

	Setup() {
		this.socket.on("Player", (data: ServerResponse) => {
			if (data.Type === "New") {
				for (var i = 0; i < data.Data.length; i++) {
					this.playersManager.Add(data.Data[i]);
					this.ground.CollisionMap[data.Data[i].Pos.x][data.Data[i].Pos.y] = true;
				}
			}

			if (data.Type === "Remove") {
				console.log("Delete Player");
				var pos = this.playersManager.Get(data.Data[0].ID).Pos;
				this.ground.CollisionMap[pos.x][pos.y] = false;
				this.playersManager.Remove(data.Data[0].ID);
			}

			if (data.Type === "Moving") {
				var tmpPlr = this.playersManager.Get(data.Data[0].ID);
				if (tmpPlr) {
					this.ground.CollisionMap[tmpPlr.Pos.x][tmpPlr.Pos.y] = false;
					tmpPlr.Move(data.Data[0]);
					this.ground.CollisionMap[tmpPlr.Pos.x][tmpPlr.Pos.y] = true;
				}
			}

			if (data.Type === "Ability") {
				var tmpPlr = this.playersManager.Get(data.Data[0].ID);
				tmpPlr.PerformAbility(data.Data[0]);
			}

		});
	}

}
