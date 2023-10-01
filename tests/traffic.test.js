import { expect, it, describe } from '@jest/globals';
import { Traffic } from '../src/messages/traffic';

describe('traffic message', () => {
	it('should produce correct message output', () => {
		// Given
		const message = new Traffic();
		message.trafficAlert = false;
		message.addressType = 0;
		message.participantAddress = 0xdd5155;
		message.latitudeDeg = 53.9502096176;
		message.longitudeDeg = -122.99488;
		message.altitudeFt = 1525;
		message.airborne = true;
		message.reportExtrapolated = false;
		message.headingTrue = true;
		message.navigationIntegrityCategory = 8;
		message.navigationAccuracyCategory = 8;
		message.horizontalVelocityKts = 45;
		message.verticalVelocityFpm = 0;
		message.trackHeadingDeg = 351.5625;
		message.emitterCategory = 9; // 1 = glider
		message.callsign = 'G-NUGC';
		message.priorityCode = 0;

		// When
		const buffer = message.getValue();

		// Then
		expect(buffer.toString('hex').toUpperCase()).toBe(
			'7E1400DD5155265D55A88978065B8802D000FA09472D4E55474320200048017E'
		);
	});
});
