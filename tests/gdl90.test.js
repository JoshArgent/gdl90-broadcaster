import {
	expect,
	it,
	beforeEach,
	describe,
	jest,
	afterEach,
} from '@jest/globals';
import { GDL90 } from '../src';
import dgram from 'dgram';
import { fail } from 'assert';
import {
	GeoAltitude,
	HearbeatMessage,
	Ownership,
	Traffic,
} from '../src/messages';

jest.mock('dgram');
jest.useFakeTimers();

describe('GDL90', () => {
	let gdl90, mockSocket;

	beforeEach(() => {
		gdl90 = new GDL90({
			dgram,
			host: '192.1.1.15',
			port: 1234,
			logging: false,
		});

		mockSocket = new dgram.Socket();
		dgram.createSocket.mockReturnValue(mockSocket);

		mockSocket.bind.mockImplementation(bindFn => bindFn());
		mockSocket.on.mockImplementation(() => {});
	});

	afterEach(() => jest.clearAllMocks());

	it('should open UDP socket', async () => {
		// When
		await gdl90.start();

		// Then
		expect(dgram.createSocket).toHaveBeenCalledTimes(1);
		expect(dgram.createSocket).toHaveBeenCalledWith('udp4');
	});

	it('should reject on error', async () => {
		// Given
		mockSocket.bind.mockClear();

		mockSocket.on.mockImplementation((event, handler) => {
			if (event === 'error') handler('An error happened!');
		});

		// When
		try {
			await gdl90.start();

			fail('Should throw an error');
		} catch (error) {
			// Then
			expect(error).toBe('An error happened!');
		}
	});

	it('should broadcast heartbeat every second', async () => {
		// When
		await gdl90.start();

		jest.advanceTimersByTime(2000);

		// Then
		expect(mockSocket.send).toHaveBeenCalledTimes(2);
		expect(mockSocket.send).toHaveBeenCalledWith(
			expect.any(Buffer),
			0,
			11,
			1234,
			'192.1.1.15'
		);
	});

	it('should call callback every second', async () => {
		// Given
		const callback = jest.fn();

		// When
		await gdl90.start(callback);

		jest.advanceTimersByTime(2000);

		// Then
		expect(callback).toHaveBeenCalledTimes(2);
		expect(callback).toHaveBeenCalledWith(expect.any(HearbeatMessage));
	});

	it('should broadcast additional messages every second', async () => {
		// Given
		const callback = jest.fn();

		callback.mockReturnValue([
			new Traffic(),
			new Traffic(),
			new Ownership(),
			new GeoAltitude(),
		]);

		// When
		await gdl90.start(callback);

		jest.advanceTimersByTime(2000);

		// Then
		expect(mockSocket.send).toHaveBeenCalledTimes(10);
		expect(mockSocket.send).toHaveBeenCalledWith(
			expect.any(Buffer),
			0,
			11,
			1234,
			'192.1.1.15'
		);
		expect(mockSocket.send).toHaveBeenCalledWith(
			expect.any(Buffer),
			0,
			32,
			1234,
			'192.1.1.15'
		);
		expect(mockSocket.send).toHaveBeenCalledWith(
			expect.any(Buffer),
			0,
			9,
			1234,
			'192.1.1.15'
		);
	});

	describe('close', () => {
		it('should close connection', async () => {
			// Given
			await gdl90.start();

			// When
			gdl90.close();

			jest.advanceTimersByTime(5000);

			// Then
			expect(mockSocket.send).not.toHaveBeenCalled();
			expect(mockSocket.close).toHaveBeenCalledTimes(1);
		});
	});
});
