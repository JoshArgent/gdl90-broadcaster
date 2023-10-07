# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

-   Exposed `IUDP` interface for broadcasting through UDP. Defaults to `NodeUDP` implementation.
-   Dependency for `buffer` package

### Changed

-   Deprecated `dgram` option on `GDL90`. Use `udpInterface` instead.
-   Fixed example in README.md

## 1.0.0

### Added

-   Basic implementation of the GDL-90 protocol
