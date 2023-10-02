import { buffer, byte, nibble, string } from 'bitwise';
import { Message } from './message';
import {
	EMITTER_CATEGORY,
	EmitterCategory,
	AddressType,
	ADDRESS_TYPE,
	NavigationIntegrityCategory,
	NavigationAccuracyCategory,
	INTEGRITY_CATEGORY,
	ACCURACY_CATEGORY,
	PriorityCode,
	PRIORITY_CODE,
} from '../enums';

export class BaseTraffic extends Message {
	/**
	 * Indicates a traffic alert status is active for this traffic.
	 * @type {boolean}
	 */
	trafficAlert = false;

	/**
	 * Indicates a traffic alert status is active for this traffic. Defaults to ADSBWithIcaoAddress.
	 * @type {AddressType}
	 */
	addressType = ADDRESS_TYPE.ADSBWithIcaoAddress;

	/**
	 * Participant address in 24-bits.
	 * @type {number}
	 */
	participantAddress = 0;

	/**
	 * Latitude in degrees
	 * @type {number}
	 */
	latitudeDeg = 0;

	/**
	 * Longitude in degrees
	 * @type {number}
	 */
	longitudeDeg = 0;

	/**
	 * Altitude in feet
	 * @type {number}
	 */
	altitudeFt = 0;

	/**
	 * Is the participant airborne? Defaults to true
	 * @type {boolean}
	 */
	airborne = true;

	/**
	 * Is the report based on extrapolated data? Defaults to false
	 * @type {boolean}
	 */
	reportExtrapolated = false;

	/**
	 * Is the reported heading a true track? Defaults to true
	 * @type {boolean}
	 */
	headingTrue = true;

	/**
	 * Is the reported heading a magnetic? Defaults to false
	 * @type {boolean}
	 */
	headingMagnetic = false;

	/**
	 * True track angle? Defaults to false
	 * @type {boolean}
	 */
	trueTrackAngle = false;

	/**
	 * The Navigational Integrity Category for the signal. Defaults to Less than 25m
	 * @type {NavigationIntegrityCategory}
	 */
	navigationIntegrityCategory = INTEGRITY_CATEGORY.LessThan25m;

	/**
	 * The Navigational Accuracy Category for the signal. Defaults to Less than 30m
	 * @type {NavigationAccuracyCategory}
	 */
	navigationAccuracyCategory = ACCURACY_CATEGORY.LessThan30m;

	/**
	 * Horizontal velocity in knots. Defaults to 0
	 * @type {number}
	 */
	horizontalVelocityKts = 0;

	/**
	 * Vertical speed in feet per minute. Defaults to 0
	 * @type {number}
	 */
	verticalVelocityFpm = 0;

	/**
	 * Heading in degrees. Defaults to 0
	 * @type {number}
	 */
	trackHeadingDeg = 0;

	/**
	 * The traffic emitter category number
	 * @type {EmitterCategory}
	 */
	emitterCategory = EMITTER_CATEGORY.Light;

	/**
	 * The callsign of the traffic. Maximum of 8 characters.
	 * @type {string}
	 */
	callsign = 'G-XXXX';

	/**
	 * The priority code for the station. Defaults to no emergency
	 * @type {PriorityCode}
	 */
	priorityCode = PRIORITY_CODE.NoEmergency;

	getMessageContent() {
		const s = nibble.read(this.trafficAlert ? 1 : 0);

		const t = nibble.read(this.addressType);

		const aaaaaaBuffer = Buffer.alloc(4);
		aaaaaaBuffer.writeUInt32BE(this.participantAddress);
		const aaaaaa = buffer.read(aaaaaaBuffer, 8, 24);

		const llllllBuffer = Buffer.alloc(4);
		llllllBuffer.writeUInt32BE(packLatLon(this.latitudeDeg));
		const llllll = buffer.read(llllllBuffer, 8, 24);

		const nnnnnnBuffer = Buffer.alloc(4);
		nnnnnnBuffer.writeUInt32BE(packLatLon(this.longitudeDeg));
		const nnnnnn = buffer.read(nnnnnnBuffer, 8, 24);

		const dddBuffer = Buffer.alloc(4);
		dddBuffer.writeUInt32BE(packAltitude(this.altitudeFt));
		const ddd = buffer.read(dddBuffer, 20, 12);

		const m = [
			boolToBit(this.airborne),
			boolToBit(this.reportExtrapolated),
			boolToBit(this.headingTrue || this.headingMagnetic),
			boolToBit(this.headingTrue || this.trueTrackAngle),
		];

		const i = nibble.read(this.navigationIntegrityCategory);

		const a = nibble.read(this.navigationAccuracyCategory);

		const hhhBuffer = Buffer.alloc(4);
		hhhBuffer.writeUInt32BE(this.horizontalVelocityKts);
		const hhh = buffer.read(hhhBuffer, 20, 12);

		const vvvBuffer = Buffer.alloc(4);
		vvvBuffer.writeUInt32BE(this.verticalVelocityFpm / 64);
		const vvv = buffer.read(vvvBuffer, 20, 12);

		const tt = byte.read(packHeading(this.trackHeadingDeg));

		const ee = byte.read(this.emitterCategory);

		const cccccccccccccccc = buffer.read(
			Buffer.from(padCallsign(this.callsign), 'ascii')
		);

		const p = nibble.read(this.priorityCode);

		const x = nibble.read(0);

		return [
			...s,
			...t,
			...aaaaaa,
			...llllll,
			...nnnnnn,
			...ddd,
			...m,
			...i,
			...a,
			...hhh,
			...vvv,
			...tt,
			...ee,
			...cccccccccccccccc,
			...p,
			...x,
		];
	}
}

function packLatLon(latLon) {
	// return latLon;
	const packed = latLon * (0x800000 / 180.0);

	if (latLon < 0) {
		return ((0x1000000 + packed) & 0xffffff) + 1; // 2s complement
	}

	return packed;
}

function packAltitude(altFt) {
	return Math.round((1000 + altFt) / 25);
}

function packHeading(heading) {
	return Math.round((heading / 360) * 256);
}

function boolToBit(bool) {
	return bool ? 1 : 0;
}

function padCallsign(callsign) {
	return callsign.padEnd(8);
}
