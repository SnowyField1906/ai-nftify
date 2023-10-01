## Setup

### Install

```bash
cd server
yarn
```

### Starts server and nodes

- **Terminal 1**

```bash
cd server
yarn start:dev:node1
```

- **Terminal 2**

```bash
cd server
yarn start:dev:node2
```

- **Terminal 3**

```bash
cd server
yarn start:dev:node3
```

### Start Bitcoin Core Server

> **Note:** Checkout [Ordinal Server](https://github.com/TranNhi27/ord_server) repo by our teammate.

### Start client

```bash
npm run start
```

### Config

- Client `.env`

```env
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=
REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET=
REACT_APP_GOOGLE_OAUTH_ENDPOINT=
REACT_APP_GOOGLE_OAUTH_REDIRECT_URL=
REACT_APP_STABLE_DIFFUSION_API=
REACT_APP_NODE1_ENDPOINT=http://localhost:3001
```

- Contract address & ABI: Check `src/scripts/`
