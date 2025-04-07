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
│   │
│   ├── services/
│   │   ├── authService.js      # Function to authenticate and get JWT token
│   │   ├── proxyService.js     # Middleware to proxy RPC requests with JWT auth
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

### 2️⃣ Use NodeJS >= 18 and install Dependencies

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

# Running HTML with Live Server

This guide will walk you through how to run the `addNftMetamask.html` file located in the `middleware-sample/test` directory using the Live Server extension in Visual Studio Code (VS Code).

## Prerequisites

Before you begin, ensure you have the following:

1. **Visual Studio Code**: If you don’t have it, you can download it from [here](https://code.visualstudio.com/).
2. **Live Server Extension**: You need to install the Live Server extension in Visual Studio Code. To do so:
   - Open Visual Studio Code.
   - Go to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window.
   - Search for "Live Server" and click the **Install** button for the first result by **Ritwick Dey**.

## Steps to Run `addNftMetamask.html`

### 1. Open the Project in VS Code

- Open Visual Studio Code.
- Click on **File** > **Open Folder** and select the `middleware-sample` project folder.

### 2. Navigate to the HTML File

- Inside Visual Studio Code, open the folder structure in the **Explorer** on the left.
- Navigate to the following path: middleware-sample/test/addNftMetamask.html

### 3. Open the HTML File

- Click on `addNftMetamask.html` to open it in the editor.

### 4. Update the `nftMetadata` Object

Before running the file, make sure to modify the `nftMetadata` object with the correct details of the NFT you own. Update the `address`, `tokenId`, and any other details like `name`, `symbol`, and `image`.

Here's the `nftMetadata` object you'll find in the file:

```javascript
const nftMetadata = {
  type: "ERC721",
  options: {
    address: "0x77edf9416A01608ccb688fBDc26Fa72FA4712A94", // Replace with your NFT contract address
    tokenId: "0", // Replace with your token ID
    symbol: "LACNFT", // Symbol of the token
    image: "", // Image URL
    name: "My Custom NFT", // Name of the NFT
  },
};
```

### 5. Start Live Server

Right-click anywhere inside the addNftMetamask.html file.

Select "Open with Live Server" from the context menu.

Alternatively, you can:

Click the Go Live button located at the bottom right of the VS Code window (this button will appear after installing the Live Server extension).

This will automatically open the HTML file in your default web browser, and Live Server will start a local development server.
