import { expect, it, describe } from '@jest/globals';
import { GeoAltitude } from '../src/messages';

describe('geo altitude message', () => {
	it('should produce correct message output', () => {
		// Given
		const message = new GeoAltitude();
		message.geoAltitudeFt = 385;
		message.verticalMetrics = 50;

		// When
		const buffer = message.getValue();

		// Then
		expect(buffer.toString('hex').toUpperCase()).toBe('7E0B004D0032AA697E');
	});
});
