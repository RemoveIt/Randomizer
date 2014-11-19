enum Champions { MuddyHag }

/**
 * On player spawn or on sending info about existing players on map
 * Namestring: Player Type: New
 * Namestring: FirstPlayer Type: ???
 */
interface PlayerFullData {
	ID: string;
	Rot: number;
	Pos: IPoint;
}

/**
 * On object start or stop moving
 * Namestring: Player Type: Moving
 */
interface MovingData {
	ID: string;
	Pos: IPoint;
	Rot: Rotation;
}


/**
 * On object remove
 * Namestring: Player Type: Remove
 */
interface ReferenceData {
	ID: string;
}

/**
 * On object remove
 * Namestring: Player Type: Remove
 */
interface AbilityData {
	ID: string;
	Key: string;
}
