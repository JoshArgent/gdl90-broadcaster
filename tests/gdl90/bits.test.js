import { expect, it, describe, jest } from '@jest/globals';
import { Byte } from '../../src/gdl90/bits';

describe('Byte', () => {
	it('should pad with zeros at the start', () => {
		// When
		const bits = new Byte([1, 0]).bits;

		// Then
		expect(bits).toEqual([0, 0, 0, 0, 0, 0, 1, 0]);
	});

	it('should return correct value', () => {
		// When
		const value = new Byte([0, 1, 0, 1]).getValue();

		// Then
		expect(value).toBe(5);
	});
});
