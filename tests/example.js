import { GDL90, Traffic } from '../src';

const server = new GDL90({ host: '192.168.0.42' });

server.ownershipMessage.callsign = 'TEST';
server.ownershipMessage.latitudeDeg = 51;
server.ownershipMessage.longitudeDeg = 1;
server.ownershipMessage.altitudeFt = 0;
server.ownershipMessage.horizontalVelocityKts = 0;
server.ownershipMessage.trackHeadingDeg = 10;
server.ownershipMessage.headingMagnetic = true;
server.ownershipMessage.airborne = false;

const traffic = new Traffic();
traffic.participantAddress++;
traffic.callsign = 'N851TB';
traffic.latitudeDeg = 51.0001;
traffic.longitudeDeg = 1.00001;
traffic.altitudeFt = 0;
traffic.horizontalVelocityKts = 10;
traffic.airborne = false;
traffic.headingMagnetic = true;
traffic.trackHeadingDeg = 180;
server.trafficMessages.push(traffic);

await server.connect();
