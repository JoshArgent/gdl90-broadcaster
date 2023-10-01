import dgram from 'dgram';
import { GDL90 } from '../src';

const server = new GDL90();

await server.connect();
