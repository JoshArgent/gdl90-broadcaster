import { buffer, byte } from 'bitwise';
import { crc16_ccitt } from '../utils/crc16';

const FLAG_BYTE = byte.read(0x7e);

export class Message {
	/**
	 * @returns {[<1|0>]}
	 */
	getMessageContent() {}

	/**
	 * @returns {Int16}
	 */
	getMessageId() {}

	getValue() {
		// Assemble the message with the Message ID byte included.
		const messageIdByte = byte.read(this.getMessageId());
		const messageData = [...messageIdByte, ...this.getMessageContent()];

		// Calculate the FCS and append it to the end of the message (least significant byte first).
		const fcs = crc16_ccitt(buffer.create(messageData));
		const fcsBuffer = Buffer.alloc(2);
		fcsBuffer.writeUInt16BE(fcs);

		// TODO: Find all of the Control-Escape and Flag Byte characters in the message and make the conversion

		// Frame the message by adding Flag Byte characters to the beginning and the end of the message
		return buffer.create([
			...FLAG_BYTE,
			...messageData,
			...buffer.read(fcsBuffer),
			...FLAG_BYTE,
		]);
	}
}
