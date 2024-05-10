import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CharityPlatformABI from './contracts/CharityPlatformABI.json'; // Import your contract ABI
import CampaignListItem from './CampaignListItem'; // Assuming you have a CampaignListItem component

const CampaignList = () => {
  const [provider, setProvider] = useState(null);
  const [charityPlatformContract, setCharityPlatformContract] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initProvider = async () => {
      try {
        if (window.ethereum) {
          const _provider = new ethers.providers.Web3Provider(window.ethereum);
          await window.ethereum.enable();
          setProvider(_provider);
        } else {
          console.log('Ethereum provider not found. Please install MetaMask or use a Web3-enabled browser.');
        }
      } catch (error) {
        console.error('Error initializing Ethereum provider:', error);
      }
    };

    initProvider();
  }, []);

  useEffect(() => {
    const loadCharityPlatformContract = async () => {
      try {
        if (provider) {
          const signer = provider.getSigner();
          const network = await provider.getNetwork();
          const contractData = CharityPlatformABI.networks[network.chainId];
          if (contractData) {
            const contractInstance = new ethers.Contract(contractData.address, CharityPlatformABI.abi, signer);
            setCharityPlatformContract(contractInstance);
          } else {
            console.error('Contract not deployed on the current network.');
          }
        }
      } catch (error) {
        console.error('Error loading CharityPlatform contract:', error);
      }
    };

    loadCharityPlatformContract();
  }, [provider]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        if (charityPlatformContract) {
          const campaignsCount = await charityPlatformContract.campaignsLength();
          const campaignsArray = [];
          for (let i = 0; i < campaignsCount; i++) {
            const campaignAddress = await charityPlatformContract.campaigns(i);
            const campaignData = await charityPlatformContract.getCampaignDetails(campaignAddress);
            campaignsArray.push({ address: campaignAddress, name: campaignData.name, description: campaignData.description });
          }
          setCampaigns(campaignsArray);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [charityPlatformContract]);

  return (
    <div>
      <h2>Campaign List</h2>
      {isLoading ? (
        <p>Loading campaigns...</p>
      ) : (
        <ul>
          {campaigns.map(campaign => (
            <CampaignListItem key={campaign.address} campaign={campaign} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignList;
