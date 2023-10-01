import { expect, it, describe } from '@jest/globals';
import { Ownership } from '../src/messages/ownership';

describe('ownership message', () => {
	it('should produce correct message output', () => {
		// Given
		const message = new Ownership();
		message.trafficAlert = false;
		message.addressType = 0;
		message.participantAddress = 11224393; //0;
		message.latitudeDeg = 44.90708;
		message.longitudeDeg = -122.99488;
		message.altitudeFt = 5000;
		message.airborne = true;
		message.reportExtrapolated = false;
		message.headingTrue = true;
		message.navigationIntegrityCategory = 10;
		message.navigationAccuracyCategory = 9;
		message.horizontalVelocityKts = 123;
		message.verticalVelocityFpm = 64;
		message.trackHeadingDeg = 45;
		message.emitterCategory = 1; // 1 = light plane
		message.callsign = 'N825V';
		message.priorityCode = 0;

		// When
		const buffer = message.getValue();

		// Then
		expect(buffer.toString('hex')).toBe(
			'7e0a00ab45491fef15a889780f09a907b00120014e3832355620202000bff77e'
		);
	});
});
