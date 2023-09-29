import dgram from 'dgram';
import { GDL90 } from './GDL90';

const server = new GDL90(dgram);

await server.connect();
