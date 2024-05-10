import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnection = ({ onConnect }) => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setConnected(true);
        onConnect(signer); // Pass the signer to the parent component
      } else {
        console.error('Ethereum wallet not detected');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
    }
  };

  const truncateAddress = (address) => {
    const maxLength = 8; 
    if (address.length <= maxLength) {
      return address;
    } else {
      return address.substring(0, maxLength) + '...';
    }
  };

  return (
    <div className="wallet-connection">
      {connected ? (
        <div>
          <p>Connected Wallet Address: {truncateAddress(walletAddress)}</p>
          <button onClick={connectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Login  Wallet</button>
      )}
    </div>
  );
};

export default WalletConnection;
