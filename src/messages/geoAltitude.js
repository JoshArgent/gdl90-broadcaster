import { buffer } from 'bitwise';
import { Message } from './message';

export class GeoAltitude extends Message {
	/**
	 * The GPS altitude (height above WGS-84 ellipsoid). Defaults to 0
	 * @type {number}
	 */
	geoAltitudeFt = 0;

	/**
	 * The Vertical Figure of Merit. Defaults to 0
	 * @type {number}
	 */
	verticalMetrics = 0;

	/**
	 * Vertical warning indication. Defaults to false
	 * @type {boolean}
	 */
	verticalWarning = false;

	getMessageId() {
		return 11;
	}

	getMessageContent() {
		const geoAltitudePacked = Math.round(this.geoAltitudeFt / 5);
		const geoAltitudeBuffer = Buffer.alloc(4);
		geoAltitudeBuffer.writeInt16BE(geoAltitudePacked, 0);
		const b1 = buffer.read(geoAltitudeBuffer, 0, 8);
		const b2 = buffer.read(geoAltitudeBuffer, 8, 8);

		const verticalMetricsBuffer = Buffer.alloc(4);
		verticalMetricsBuffer.writeInt16BE(this.verticalMetrics, 0);
		const b3 = buffer.read(verticalMetricsBuffer, 0, 8);
		const b4 = buffer.read(verticalMetricsBuffer, 8, 8);

		b3[0] = this.verticalWarning ? 1 : 0;

		return [...b1, ...b2, ...b3, ...b4];
	}
}
