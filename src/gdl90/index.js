import dgram from 'dgram';
import { GDL90 } from './GDL90';
import { Byte } from './bits';

// const server = new GDL90(dgram);

// await server.connect();

console.log(new Byte([1, 0]).getValue());
