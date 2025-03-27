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
    const data = qs.stringify({
      username: process.env.AUTH_USER,
      password: process.env.AUTH_PASS,
    });

    const response = await axios.post(process.env.AUTH_SERVICE, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    cachedToken = response.data.access_token;
    tokenExpiration = currentTime + (response.data.expires_in || 3600); // Default to 1 hour if `expires_in` is missing

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
