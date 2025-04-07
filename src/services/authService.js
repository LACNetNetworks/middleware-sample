const axios = require("axios");
const qs = require("qs");

let cachedToken = null;
let tokenExpiration = 0;

async function getJwtToken() {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  if (cachedToken && currentTime < tokenExpiration) {
    return cachedToken; // Return cached token if still valid
  }

  try {
    const isMainnet = process.env.NETWORK === "mainnet";

    const data = isMainnet
      ? qs.stringify({
          username: process.env.AUTH_USER,
          password: process.env.AUTH_PASS,
        })
      : {
          username: process.env.AUTH_USER,
          password: process.env.AUTH_PASS,
        };

    const headers = isMainnet
      ? { "Content-Type": "application/x-www-form-urlencoded" }
      : { "Content-Type": "application/json" };

    const response = await axios.post(process.env.AUTH_SERVICE, data, {
      headers,
    });

    cachedToken = response.data.access_token;
    tokenExpiration = currentTime + (response.data.expires_in || 3600);

    return cachedToken;
  } catch (error) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message
    );
    return null;
  }
}

module.exports = { getJwtToken };
