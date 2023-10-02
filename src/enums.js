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
