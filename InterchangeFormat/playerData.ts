interface IPoint {
	x: number;
	y: number;
}


interface ServerResponse {
	ObjectID;
	Data;

}


// On player spawn or on sending info about existing players in map
interface PlayerData {
	Pos: IPoint;
	MovV: IPoint;
}

//On object start or stop moving
interface MovingData {
	Pos: IPoint;
	MovV: IPoint;
}
