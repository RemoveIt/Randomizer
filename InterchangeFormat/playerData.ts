interface IPoint {
	x: number;
	y: number;
}

enum ServerResoneRange { Me, Specific, List, All };

/**
 * All server responses must be wraped with it
 */
interface ServerResponse {
	Range: ServerResoneRange;
	ObjectID?: string[];
	Data;
}

/**
 * On player spawn or on sending info about existing players in map
 * CMD: NewPlayer
 */
interface PlayerData {
	Pos: IPoint;
	MovV: IPoint;
}

/**
 * On object start or stop moving
 * CMD: Moving
 */
interface MovingData {
	Pos: IPoint;
	MovV: IPoint;
}
