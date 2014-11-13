// Server response types for Player namestring
// New

/**
 * On player spawn or on sending info about existing players on map
 * Namestring: Player Type: New
 * Namestring: FirstPlayer Type: ???
 */
interface PlayerFullData {
	ID: string;
	Pos: IPoint;
}

/**
 * On object start or stop moving
 * Namestring: Player Type: Moving
 */
interface MovingData {
	ID: string;
	Pos: IPoint;
	KeyCode: number;
}


/**
 * On object remove
 * Namestring: Player Type: Remove
 */
interface ReferenceData {
	ID: string;
}
