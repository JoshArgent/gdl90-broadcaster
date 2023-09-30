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
	uatInitialized = false;
	csaRequested = false;
	csaNotAvailable = false;
	utcOk = true;

	getValue() {
		const b1 = byte.read(0); // Message Id
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
			1,
			0,
			0,
			0,
			0,
			boolToBit(this.csaNotAvailable),
			boolToBit(this.csaRequested),
			0,
		];

		const timestamp = secondsSinceMidnight(this.timestamp);
		const timestampBuffer = Buffer.alloc(4);
		timestampBuffer.writeUInt32LE(timestamp, 0);
		const b4 = buffer.read(timestampBuffer, 0, 8);
		const b5 = buffer.read(timestampBuffer, 8, 8);
		b3[7] = buffer.read(timestampBuffer, 16, 1)[0];

		const messageCountsBuffer = Buffer.alloc(2);
		messageCountsBuffer.writeUInt16LE(0);
		const b6 = buffer.read(messageCountsBuffer, 0, 8);
		const b7 = buffer.read(messageCountsBuffer, 8, 8);

		return buffer.create([b1, b2, b3, b4, b5, b6, b7].flat(1));
	}
}

function boolToBit(bool) {
	return bool ? 1 : 0;
}
