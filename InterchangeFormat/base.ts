
// Server response namestrings:
// Player FirstPlayer


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