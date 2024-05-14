
---
[![cover.png](https://i.postimg.cc/8znnNFdD/cover.png)](https://postimg.cc/bZkRRwFF)
# HemaHope
-----

HemaHope is an innovative platform designed to revolutionize how charity campaigns are managed using blockchain technology. By ensuring transparency, security, and efficiency, HemaHope facilitates physical item donations for various charitable causes.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Smart Contracts Deployment](#smart-contracts-deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
HemaHope is a React application integrated with Ethereum smart contracts to provide a decentralized platform for managing charity campaigns. The platform allows users to create campaigns, receive physical item donations, and track the progress of each campaign in real-time. 

HemaHope smart contracts are deployed on Dymesion's RollApp X Testnet, leveraging Dymesion's Efficient RDK (RollApp Development Kit) for enhanced security and access to liquidity.

## Features
- **Create Campaigns:** Easily create new charity campaigns with detailed descriptions, target items, and duration settings.
- **Receive Donations:** Donors can contribute physical items to campaigns, with every donation securely recorded on the blockchain.
- **Track Campaigns:** Real-time tracking of all active campaigns and their progress.
- **Smart Contract Integration:** Secure and transparent automation of the donation process.
- **User-Friendly Interface:** Intuitive and responsive design for accessibility.

## Technologies Used
- **Frontend:**
  - React
  - JavaScript
  - CSS

- **Blockchain:**
  - Solidity
  - Ethers.js
  - Web3.js

- **Deployment:**
  - Dymesion's RollApp X Testnet

## Setup and Installation

### Prerequisites
- Node.js
- npm or yarn
- MetaMask extension installed in your browser

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/gethsun1/hemahope.git
   cd hemahope
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```bash
   REACT_APP_INFURA_PROJECT_ID=<Your Infura Project ID>
   REACT_APP_CONTRACT_ADDRESS=<Your Deployed Contract Address>
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

The application should now be running at `http://localhost:3000`.

## Smart Contracts Deployment
HemaHope's smart contracts are deployed on Dymesion's RollApp X Testnet. Dymesion's Efficient RDK facilitates the development and deployment process by providing pre-defined modules for minting native tokens, onchain governance, and bridging.

### Deployment Steps
1. Compile the smart contracts using the Solidity compiler.
2. Deploy the compiled contracts to Dymesion's RollApp X Testnet.
3. Update the contract addresses in the frontend application.

### RollApps Overview
- **Tokens:** Mint, charge gas for transactions, and distribute tokens with custom configurations.
- **Governance:** Decentralized onchain governance mechanism for distributing control over onchain parameters and funds.
- **Bridging:** IBC bridging for access to the extensive IBC ecosystem, including currencies like USDC and USDT.

### Deploying EVM Compatible Smart Contracts
Dymesion’s RollApp X Testnet supports deploying Ethereum Virtual Machine (EVM) compatible smart contracts. This compatibility ensures that developers can use familiar tools and languages like Solidity to create and deploy smart contracts.

1. **Compile Your Contracts:** Use tools like Truffle or Hardhat to compile your Solidity contracts.
   ```bash
   truffle compile
   # or using Hardhat
   npx hardhat compile
   ```

2. **Deploy to RollApp X Testnet:** Configure your deployment scripts to target Dymesion's RollApp X Testnet. Ensure you have the network configuration set up properly.
   ```javascript
   module.exports = {
     networks: {
       rollappX: {
         provider: () => new HDWalletProvider(mnemonic, `https://rollappX.infura.io/v3/${infuraProjectId}`),
         network_id: 1234, // RollApp X Testnet ID
         gas: 5500000,
         confirmations: 2,
         timeoutBlocks: 200,
         skipDryRun: true
       }
     },
     // Other configurations...
   };
   ```

3. **Update Frontend Configurations:** Once deployed, update the frontend application with the new contract addresses and ABI.

## Usage
1. **Connect Wallet:** Use the "Connect Wallet" button to connect your MetaMask wallet.
2. **Create Campaign:** Fill out the form with campaign details and submit to create a new campaign.
3. **Donate:** Choose an active campaign and donate physical items.
4. **Track Progress:** Monitor the progress of each campaign in real-time.

## Contributing
We welcome contributions from the community. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

