/**
 * Emitter categories according to GDL-90 specification
 * @typedef {number} EmitterCategory
 */
export const EMITTER_CATEGORY = Object.freeze({
	Unknown: 0,
	Light: 1,
	Small: 2,
	Large: 3,
	HighVortexLarge: 4,
	Heavy: 5,
	HighlyManeuverable: 6,
	Rotorcraft: 7,
	Glider: 9,
	LighterThanAir: 10,
	Parachutist: 11,
	UltraLight: 12,
	Unmanned: 14,
	SpaceVehicle: 15,
	EmergencySurfaceVehicle: 17,
	ServiceSurfaceVehicle: 18,
	PointObstacle: 19,
	ClusterObstacle: 20,
	LineObstacle: 21,
});

/**
 * ADS-B or TIS-B address type
 * @typedef {number} AddressType
 */
export const ADDRESS_TYPE = Object.freeze({
	ADSBWithIcaoAddress: 0,
	ADSBWithSelfAssignedAddress: 1,
	TISBWithIcaoAddress: 2,
	TISBWithTrackFileId: 3,
	SurfaceVehicle: 4,
	GroundStation: 5,
});

/**
 * Navigation Integrity Category (NIC)
 * @typedef {number} NavigationIntegrityCategory
 */
export const INTEGRITY_CATEGORY = Object.freeze({
	Unknown: 0,
	LessThan20NM: 1,
	LessThan8NM: 2,
	LessThan4NM: 3,
	LessThan2NM: 4,
	LessThan1NM: 5,
	LessThan0_6NM: 6,
	LessThan0_2NM: 7,
	LessThan0_1NM: 8,
	LessThan75m: 9,
	LessThan25m: 10,
	LessThan7_5m: 11,
});

/**
 * Navigation Accuracy Category (NIC)
 * @typedef {number} NavigationAccuracyCategory
 */
export const ACCURACY_CATEGORY = Object.freeze({
	Unknown: 0,
	LessThan10NM: 1,
	LessThan4NM: 2,
	LessThan2NM: 3,
	LessThan1NM: 4,
	LessThan0_5NM: 5,
	LessThan0_3NM: 6,
	LessThan0_1NM: 7,
	LessThan0_05NM: 8,
	LessThan30m: 9,
	LessThan10m: 10,
	LessThan3m: 11,
});

/**
 * Emergency priority code
 * @typedef {number} PriorityCode
 */
export const PRIORITY_CODE = Object.freeze({
	NoEmergency: 0,
	GeneralEmergency: 1,
	MedicalEmergency: 2,
	MinimumFuel: 3,
	NoCommunication: 4,
	UnlawfulInterference: 5,
	DownedAircraft: 6,
});
