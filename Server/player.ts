class Player {

	ID;
	Socket;
	Pos: IPoint;
	MovingV: IPoint;

	constructor(Socket) {
		//this.ID = Socket;
		this.Pos = { x: Math.random() * 200, y: Math.random() * 200 };
		this.MovingV = { x: 0, y: 0 };
	}

	Move(movingData: MovingData) {
		this.MovingV = movingData.MovV;
		this.Pos = movingData.Pos;
	}
}
