import { buffer } from 'bitwise';
import { secondsSinceMidnight } from '../utils/date';
import { Message } from './message';

export class HearbeatMessage extends Message {
	/**
	 * @private
	 * The timestamp the hearbeat is for. Automatically set by the broadcaster
	 * @type {Date}
	 */
	timestamp = new Date();

	/**
	 * True indicates there is a valid GPS position available
	 * @default true
	 * @type {boolean}
	 */
	gpsPosValid = true;

	/**
	 * True indicates the device requires maintenance
	 * @default false
	 * @type {boolean}
	 */
	maintReq = false;

	/**
	 * True indicates the devices IDENT button has been pressed
	 * @default false
	 * @type {boolean}
	 */
	ident = false;

	/**
	 * True indicates the device has a temporary self-assigned anonymous address
	 * @default false
	 * @type {boolean}
	 */
	addrType = false;

	/**
	 * True indicates the device is low on battery
	 * @default false
	 * @type {boolean}
	 */
	gpsBattLow = false;

	/**
	 * True indicates the device is receiving ATC services
	 * @default false
	 * @type {boolean}
	 */
	ratcs = false;

	/**
	 * Should be set to true for all hearbeat messages
	 * @private
	 * @default true
	 * @type {boolean}
	 */
	uatInitialized = true;

	/**
	 * True indicates the GDL-90 Conflict Situational Awareness algorithm has been requested
	 * @default false
	 * @type {boolean}
	 */
	csaRequested = false;

	/**
	 * True indicates the GDL-90 Conflict Situational Awareness algorithm has been requested but is not available
	 * @default false
	 * @type {boolean}
	 */
	csaNotAvailable = false;

	/**
	 * @private
	 * @default true
	 * @type {boolean}
	 */
	utcOk = true;

	/**
	 * The message count buffer according to the GDL-90 specification.
	 * Two bytes used to represent the number of UAT messages received in the previous second by the device.
	 * @default 0
	 * @type {Int16}
	 */
	messageCountsBuffer = 0;

	getMessageId() {
		return 0;
	}

	getMessageContent() {
		const b2 = [
			boolToBit(this.uatInitialized),
			0,
			boolToBit(this.ratcs),
			boolToBit(this.gpsBattLow),
			boolToBit(this.addrType),
			boolToBit(this.ident),
			boolToBit(this.maintReq),
			boolToBit(this.gpsPosValid),
		];
		const b3 = [
			0,
			boolToBit(this.csaRequested),
			boolToBit(this.csaNotAvailable),
			0,
			0,
			0,
			0,
			boolToBit(this.utcOk),
		];

		const timestamp = secondsSinceMidnight(this.timestamp);
		const timestampBuffer = Buffer.alloc(4);
		timestampBuffer.writeUInt32LE(timestamp, 0);
		const b4 = buffer.read(timestampBuffer, 8, 8);
		const b5 = buffer.read(timestampBuffer, 0, 8);
		b3[0] = buffer.read(timestampBuffer, 16, 1)[0];

		const messageCountsBuffer = Buffer.alloc(2);
		messageCountsBuffer.writeUInt16BE(this.messageCountsBuffer);
		const b6 = buffer.read(messageCountsBuffer, 0, 8);
		const b7 = buffer.read(messageCountsBuffer, 8, 8);

		return [...b2, ...b3, ...b4, ...b5, ...b6, ...b7];
	}
}

function boolToBit(bool) {
	return bool ? 1 : 0;
}
