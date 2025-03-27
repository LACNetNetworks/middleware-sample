require("dotenv").config();
const express = require("express");
const rpcProxy = require("./services/proxyService");

const app = express();

// Add middleware to parse JSON body
app.use(express.json()); // Make sure to add this line

// Attach the proxy service
app.use("/rpc", rpcProxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/rpc`);
});
