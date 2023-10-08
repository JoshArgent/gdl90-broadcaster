import { GDL90, GeoAltitude, Ownership, Traffic } from '../src';
import dgram from 'dgram';

const server = new GDL90({ dgram, logging: true });

await server.start(heartbeat => {
	const owner = new Ownership();
	owner.callsign = 'G-WZYZ';
	owner.latitudeDeg = 51;
	owner.longitudeDeg = 1;
	owner.altitudeFt = 1000;
	owner.horizontalVelocityKts = 90;
	owner.trackHeadingDeg = 10;
	owner.headingMagnetic = true;
	owner.airborne = true;

	const geoAlt = new GeoAltitude();
	geoAlt.geoAltitudeFt = 1000;
	geoAlt.verticalMetrics = 50;

	const traffic = new Traffic();
	traffic.participantAddress++;
	traffic.callsign = 'N851TB';
	traffic.latitudeDeg = 51.0001;
	traffic.longitudeDeg = 1.00001;
	traffic.altitudeFt = 1200;
	traffic.horizontalVelocityKts = 110;
	traffic.airborne = true;
	traffic.headingMagnetic = true;
	traffic.trackHeadingDeg = 180;

	return [owner, geoAlt, traffic];
});
