import { GDL90, Traffic } from '../src';

const server = new GDL90({ logging: true });

server.ownershipMessage.callsign = 'TEST';
server.ownershipMessage.latitudeDeg = 51;
server.ownershipMessage.longitudeDeg = 1;
server.ownershipMessage.altitudeFt = 1000;
server.ownershipMessage.horizontalVelocityKts = 90;
server.ownershipMessage.trackHeadingDeg = 10;
server.ownershipMessage.headingMagnetic = true;
server.ownershipMessage.airborne = true;

server.geometricAltitudeMessage.geoAltitudeFt = 1000;
server.geometricAltitudeMessage.verticalMetrics = 50;

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
server.trafficMessages.push(traffic);

await server.connect();
