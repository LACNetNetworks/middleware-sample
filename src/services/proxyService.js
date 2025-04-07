const axios = require("axios");
const { getJwtToken } = require("./authService"); // Assume this is a service for getting the JWT token

const proxyRequest = async (req, res) => {
  try {
    console.log("Forwarding request to RPC...");

    // Prepare request headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // Add Authorization token if available
    const token = await getJwtToken(); // or req.jwtToken if you have it available directly

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("Warning: No JWT Token found!");
    }

    // Forward the request to the target RPC URL
    const response = await axios({
      method: req.method,
      url: `${process.env.RPC_URL}${req.url.replace("/rpc", "")}`, // Adjust the target URL
      headers: headers,
      data: req.body, // Forward the body from the original request
    });

    // Return the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
};

module.exports = proxyRequest;
