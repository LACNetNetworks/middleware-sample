# Metamask RPC Middleware

## Overview

This middleware is built using **Node.js**, **Express**, and **http-proxy-middleware** to act as an authentication proxy for Metamask RPC connections. It authenticates users, retrieves a JWT token, and forwards requests to the RPC API with the correct authorization headers.

## Features

- **JWT Authentication**: Fetches a token dynamically before forwarding requests.
- **Secure Proxying**: Ensures all RPC calls include authentication.
- **Environment Variables**: Credentials are managed securely in a `.env` file.
- **Modular Architecture**: Cleanly structured with separate authentication and middleware logic.

## Folder Structure

```plaintext
metamask-middleware/
│── src/
│   ├── middleware/
│   │   ├── proxyMiddleware.js  # Middleware to proxy RPC requests with JWT auth
│   ├── services/
│   │   ├── authService.js      # Function to authenticate and get JWT token
│   ├── config/
│   │   ├── dotenv.js           # Loads environment variables
│   ├── index.js                # Main entry point (Express server)
│── .env                        # Environment variables
│── package.json                # Dependencies and scripts
│── README.md                   # Project documentation
```

## Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo/metamask-middleware.git
cd metamask-middleware
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory:

```ini
PORT=3000
AUTH_USER=myusername
AUTH_PASS=mypassword
AUTH_SERVICE=https://auth.naas.lacnet.com/login
RPC_URL=https://naas.lacnet.com/rpc
```

## Usage

### Start the Server

```sh
node src/index.js
```

### Connect Metamask to Middleware RPC

Set Metamask's **Custom RPC URL** to:

```plaintext
http://localhost:3000/rpc
```

This will automatically authenticate and forward requests to the RPC API.

## Code Breakdown

### Authentication Service (`src/services/authService.js`)

Handles authentication and retrieves the JWT token:

```javascript
const axios = require("axios");

async function getJwtToken() {
  try {
    const response = await axios.post("http://auth.naas.lacnet.com/login", {
      username: process.env.AUTH_USER,
      password: process.env.AUTH_PASS,
    });
    return response.data.token;
  } catch (error) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message
    );
    return null;
  }
}

module.exports = { getJwtToken };
```

### Proxy Middleware (`src/middleware/proxyMiddleware.js`)

Intercepts RPC requests and attaches the JWT token:

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");
const { getJwtToken } = require("../services/authService");

async function proxyMiddleware(req, res, next) {
  const jwtToken = await getJwtToken();
  if (!jwtToken) {
    return res.status(401).json({ error: "Authentication failed" });
  }

  createProxyMiddleware({
    target: "http://naas.lacnet.com/rpc",
    changeOrigin: true,
    pathRewrite: { "^/rpc": "" },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("Authorization", `Bearer ${jwtToken}`);
    },
  })(req, res, next);
}

module.exports = proxyMiddleware;
```

### Main Server (`src/index.js`)

Initializes Express and applies the middleware:

```javascript
require("./config/dotenv"); // Load environment variables
const express = require("express");
const proxyMiddleware = require("./middleware/proxyMiddleware");

const app = express();

app.use("/rpc", proxyMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Proxy running on http://localhost:${PORT}/rpc`)
);
```
