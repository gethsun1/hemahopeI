require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');

const path = require('path');

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {},
      },
      {
        version: "0.8.20", 
        settings: {},
      },
    ],
  },
  paths: {
    artifacts: path.join(__dirname, 'src/artifacts'),
    contracts: path.join(__dirname, 'src/contracts'),
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rolx: {
      url: "https://json-rpc.rolxtwo.evm.ra.blumbus.noisnemyd.xyz",
      chainId: 100004,
      accounts: [''],
      gasPrice: 8000000000, // Example gas price, adjust as needed
      gas: 6000000, // Example gas limit, adjust as needed
    },
  },
};
