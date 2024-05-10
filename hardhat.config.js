require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rolx_100004_1: {
      url: "https://rpc.rolxtwo.evm.ra.blumbus.noisnemyd.xyz",
      chainId: 100004,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
