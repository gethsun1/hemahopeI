import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './header';
import Footer from './footer';
import HemaHopeABI from '../HemaHope.json';

const CreateCampaign = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetItems, setTargetItems] = useState('');
  const [loading, setLoading] = useState(false);

  const getConnectedWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
          setConnected(true);
        } else {
          console.error('No accounts connected');
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error.message);
      }
    } else {
      console.error('Ethereum wallet not detected');
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!name || !description || !targetItems) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const hemahope = new ethers.Contract(
        process.env.REACT_APP_HEMAHOPE_ADDRESS, // Replace with the deployed HemaHope contract address
        HemaHopeABI.abi,
        signer
      );
  
      await hemahope.createPhysicalItemCampaign(name, description, targetItems);
      console.log('Campaign created successfully!');
    } catch (error) {
      console.error('Error creating campaign:', error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getConnectedWallet();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="about-text-area pt-90 pb-130">
          <div className="container">
            <div className="row justify-content-center p-relative">
              <div className="col-lg-10">
                <div className="about-me-send-message">
                  <div className="contact-form">
                    <form onSubmit={handleCreateCampaign}>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="contact-input">
                            <input
                              type="text"
                              placeholder="Campaign Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="contact-input">
                            <textarea
                              placeholder="Description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="contact-input">
                            <input
                              type="text"
                              placeholder="Target Items"
                              value={targetItems}
                              onChange={(e) => setTargetItems(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="about-me-btn text-center">
                            <button
                              type="submit"
                              className="tp-btn-black tp-btn-shine-effect"
                              disabled={!connected || loading}
                            >
                              {loading ? 'Creating...' : 'Create Campaign'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CreateCampaign;
