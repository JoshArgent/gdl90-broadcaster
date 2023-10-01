import { bits, buffer, byte } from 'bitwise';
import { crc16_ccitt } from '../utils/crc16';

const FLAG_BYTE = 0x7e;
const ESCAPE_BYTE = 0x7d;
const ESCAPE_XOR = 0x20;

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
		fcsBuffer.writeUInt16LE(fcs);

		// Find all of the Control-Escape and Flag Byte characters in the message and make the conversion
		const escapedMessage = escapeControlCharacters(messageData);

		// Frame the message by adding Flag Byte characters to the beginning and the end of the message
		return buffer.create([
			...byte.read(FLAG_BYTE),
			...escapedMessage,
			...buffer.read(fcsBuffer),
			...byte.read(FLAG_BYTE),
		]);
	}
}

function escapeControlCharacters(messageData) {
	const messageBuffer = buffer.create(messageData);
	const escapedMessage = [];

	for (const item of messageBuffer) {
		if (item === FLAG_BYTE || item === ESCAPE_BYTE) {
			const escaped = bits.xor(byte.read(item), byte.read(ESCAPE_XOR));
			escapedMessage.push(...byte.read(ESCAPE_BYTE), ...escaped);
		} else {
			escapedMessage.push(...byte.read(item));
		}
	}

	return escapedMessage;
}
