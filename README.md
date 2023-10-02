# gdl90-broadcaster

A lightweight implementation of Garmin's GDL-90 protocol in pure javascript.

## Install

```shell
npm install gdl90-broadcaster
```

## Usage

Import the `GDL90` class and open a connection:

```javascript
import { GDL90, Traffic } from '../src';

const server = new GDL90();

// Set the latitude and longitude position
server.ownershipMessage.latitudeDeg = 51;
server.ownershipMessage.longitudeDeg = -1.1;

await server.connect();
```

See [example.js](./tests/example.js) for a complete example implementation.

## Supported Protocol Messages

The GDL-90 protocol has been implemented according to the specification found in the [/docs](./docs/GDL90_Public_ICD_RevA.PDF) directory.

There are a number of different message types that the protocol supports.
This library only implements broadcasting the following message types:

### Heartbeat

This is a message that is automatically sent every UTC second.
It contains information about the status of the broadcasting device.

### Ownership Report

This is used to broadcast traffic information about the broadcasting device.
It includes many different fields such as position, altitude, speed, callsign etc.

### Traffic Report

This has the same properties as the ownership report and is used to report nearby traffic.
Many traffic reports can be created and broadcast.

### Ownership Geometric Altitude

The geometric altitude message is used to broadcast the device's GPS altitude when available.
