
// Server response namestrings:
// Player FirstPlayer

enum Rotation { Left, Up, Right, Down };

/**
 * All server responses must be wraped with it
 */
interface ServerResponse {
	/**
	 *Specific type depends on Category
	 *
	 */
	Type?;
	Data: Array<any>;
}



interface IPoint {
	x: number;
	y: number;
}