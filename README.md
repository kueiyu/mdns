# mDNS Implementation

This project implements a lightweight mDNS (Multicast DNS) client/server using Node.js. It demonstrates how hostnames are resolved to IP addresses in a Local Area Network (LAN) without a central DNS server.

## Understanding mDNS Protocol

Multicast DNS (mDNS) resolves hostnames to IP addresses within small networks that do not include a local name server. It enables **Zero-configuration networking**, allowing devices to discover each other using `.local` names (e.g., `printer.local`).

### Problem Solved
In standard Internet architecture, a centralized DNS server resolves domain names. In a local LAN (e.g., home or small office), setting up a dedicated DNS server is often impractical. mDNS solves this by allowing devices to act as their own DNS servers.

### Protocol Mechanism
mDNS operates over **UDP port 5353** using IP multicast.

1.  **Query:** A client broadcasts a message to the entire subnet asking, *"Who is `device.local`?"*
2.  **Response:** All devices receive the query. The device claiming that name replies via multicast: *"I am `device.local` at IP `192.168.1.5`."*
3.  **Discovery:** The querying client (and others listening) updates its cache with the new A Record.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager

### Installation
Clone the repository and install dependencies:

```bash
yarn install
```

### Usage
Run in TypeScript (Recommended):
- Uses tsx for direct execution with ESM support.
```bash
yarn run ts
```
### Run in JavaScript:
Executes the compiled/legacy JS version.

```bash
yarn run js
```

### Testing
Run the unit test suite (powered by Vitest) to verify the mDNS responder logic:

```bash
yarn test
```
