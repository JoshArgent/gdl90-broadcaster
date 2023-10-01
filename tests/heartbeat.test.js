import { expect, it, describe } from '@jest/globals';
import { HearbeatMessage } from '../src/messages';

describe('heartbeat message', () => {
	it('should produce correct message output', () => {
		// Given
		const message = new HearbeatMessage();
		message.timestamp = new Date(2023, 8, 30, 15, 37, 52);
		message.csaRequested = true;
		message.utcOk = true;
		message.messageCountsBuffer = 2050;

		// When
		const buffer = message.getValue();

		// Then
		expect(buffer.toString('hex')).toBe('7e008141dbd00802b38b7e');
	});
});