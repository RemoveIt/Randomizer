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
 * On player start or stop moving
 * Namestring: Player Type: Moving
 */
interface MovingData {
	ID: string;
	Pos: IPoint;
	Rot: Rotation;
}


/**
 * On player remove
 * Namestring: Player Type: Remove
 */
interface ReferenceData {
	ID: string;
}

/**
 * On player use an ability
 * Namestring: Player Type: Ability
 */
interface AbilityData {
	ID: string;
	Key: string;
	AddInfo?: any;
}
