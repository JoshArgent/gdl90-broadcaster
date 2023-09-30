import { buffer, byte } from 'bitwise';
import { secondsSinceMidnight } from '../utils/date';
import { Message } from './message';

export class HearbeatMessage extends Message {
	timestamp = new Date();
	gpsPosValid = true;
	maintReq = false;
	ident = false;
	addrType = false;
	gpsBattLow = false;
	ratcs = false;
	uatInitialized = true;
	csaRequested = true;
	csaNotAvailable = false;
	utcOk = true;

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
		messageCountsBuffer.writeUInt16BE(0);
		const b6 = buffer.read(messageCountsBuffer, 0, 8);
		const b7 = buffer.read(messageCountsBuffer, 8, 8);

		return [...b2, ...b3, ...b4, ...b5, ...b6, ...b7];
	}
}

function boolToBit(bool) {
	return bool ? 1 : 0;
}
