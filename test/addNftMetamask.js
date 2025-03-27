const {
  LacchainProvider,
  LacchainSigner,
} = require("@lacchain/gas-model-provider");

const yourRPCNode = "http://localhost:3000/rpc";
const tokenAddress = "0x77edf9416A01608ccb688fBDc26Fa72FA4712A94";
const tokenSymbol = "LACNFT";
const tokenNftId = 0;
const tokenImage = "";

async function addAssetToWallet() {
  try {
    const provider = new LacchainProvider(yourRPCNode);
    // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
    // Or window.ethereum if you don't support EIP-6963.
    const wasAdded = await provider._perform({
      method: "wallet_watchAsset",
      params: {
        type: "ERC721",
        options: {
          // The address of the token.
          address: tokenAddress,
          // A ticker symbol or shorthand, up to 5 characters.
          symbol: tokenSymbol,
          // The number of decimals in the token.
          tokenId: tokenNftId,
          // A string URL of the token logo.
          image: tokenImage,
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
}

// Call the async function
addAssetToWallet();
