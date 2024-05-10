require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rolx: {
      url: "https://json-rpc.rolxtwo.evm.ra.blumbus.noisnemyd.xyz",
      chainId: 100004,
      accounts: ["4c7edcb1541d07021aa9a09fbb4dafe135ab068b87659cce5332a10bb560e373"],
    },
  },
};
