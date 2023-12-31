# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v2.0.1

### Added

-   `jsconfig.json` file

### Fixed

-   Negative vertical and horizontal velocities cause an unhandled exception

## v2.0.0

### Added

-   Dependency for `buffer` package

### Changed

-   `dgram` option is now a required parameter of `GDL90` **(breaking change)**
-   Fixed example in README.md

### Removed

-   Dependency on any Node library APIs (`dgram` and `Buffer`)

## 1.0.0

### Added

-   Basic implementation of the GDL-90 protocol
