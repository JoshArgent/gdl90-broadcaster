# gdl90-broadcaster

![npm](https://img.shields.io/npm/v/gdl90-broadcaster)
![npm bundle size](https://img.shields.io/bundlephobia/min/gdl90-broadcaster)

A lightweight implementation of Garmin's GDL-90 protocol in pure javascript.

## Install

```shell
npm install gdl90-broadcaster
```

## Usage

Import the `GDL90` class and open a connection:

```javascript
import { GDL90, Ownership } from '../src';
import dgram from 'dgram';

const server = new GDL90({ dgram });

await server.start(heartbeat => {
	const owner = new Ownership();
	owner.callsign = 'G-WXYZ';
	owner.latitudeDeg = 51;
	owner.longitudeDeg = -1.1;

	return [owner];
});
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

## Running in Non-Node Environment

gdl90-broadcaster can be used in any environment, it does not depend on any Node APIs.

The example provided use's Node's `dgram` API, however this can be subtituted for any other UDP package that implements the `dgram` API.

For example, the `react-native-udp` library for React Native:

```javascript
import { GDL90 } from '../src';
import reactNativeUdp from 'react-native-udp';

const server = new GDL90({ dgram: reactNativeUdp });
```
