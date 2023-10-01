import { buffer, byte, nibble, string } from 'bitwise';
import { Message } from './message';

export class Ownership extends Message {
	trafficAlert = false;
	addressType = 0;
	participantAddress = 0;
	latitudeDeg = 0;
	longitudeDeg = 0;
	altitudeFt = 0;
	airborne = true;
	reportExtrapolated = false;
	headingTrue = true;
	navigationIntegrityCategory = 10;
	navigationAccuracyCategory = 9;
	horizontalVelocityKts = 100;
	verticalVelocityFpm = 0;
	trackHeadingDeg = 0;
	emitterCategory = 1; // 1 = light plane
	callsign = 'G-XXXX';
	priorityCode = 0;

	getMessageId() {
		return 10;
	}

	getMessageContent() {
		const s = nibble.read(this.trafficAlert ? 1 : 0);

		const t = nibble.read(this.addressType);

		const aaaaaaBuffer = Buffer.alloc(4);
		aaaaaaBuffer.writeUInt32BE(this.participantAddress);
		const aaaaaa = buffer.read(aaaaaaBuffer, 8, 24);

		const llllllBuffer = Buffer.alloc(4);
		llllllBuffer.writeInt32BE(packLatLon(this.latitudeDeg));
		const llllll = buffer.read(llllllBuffer, 8, 24);

		const nnnnnnBuffer = Buffer.alloc(4);
		nnnnnnBuffer.writeInt32BE(packLatLon(this.longitudeDeg));
		const nnnnnn = buffer.read(nnnnnnBuffer, 8, 24);

		const dddBuffer = Buffer.alloc(4);
		dddBuffer.writeUInt32BE(packAltitude(this.altitudeFt));
		const ddd = buffer.read(dddBuffer, 20, 12);

		const m = [
			boolToBit(this.airborne),
			boolToBit(this.reportExtrapolated),
			boolToBit(!this.headingTrue), // true track angle
			boolToBit(this.headingTrue),
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
	return latLon * (0x800000 / 180.0);
}

function packAltitude(altFt) {
	return (1000 + altFt) / 25;
}

function packHeading(heading) {
	return (heading / 360) * 256;
}

function boolToBit(bool) {
	return bool ? 1 : 0;
}

function padCallsign(callsign) {
	return callsign.padEnd(8);
}
