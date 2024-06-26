import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './header';
import Footer from './footer';
import HemaHopeABI from '../HemaHope.json';
import Data from './config'
const CreateCampaign = () => {
   const [connected, setConnected] = useState(false);
   const [walletAddress, setWalletAddress] = useState('');
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [duration, setDuration] = useState('');
   const [targetItems, setTargetItems] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [successMessage, setSuccessMessage] = useState('');

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
               setError('No Web3 Wallet Connected');
            }
         } catch (error) {
            setError('Error checking wallet connection: ' + error.message);
         }
      } else {
         setError('Web3 Wallet Not Detected');
      }
   };

   const handleCreateCampaign = async (e) => {
      e.preventDefault();
    
      if (!name || !description || !targetItems || !duration) {
         alert('Please fill in all fields');
         return;
      }
      setLoading(true);

      try {
         if (!connected) {
            setError('Connection to a wallet is required!')
            return;
         }
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();
         const hemahope = new ethers.Contract(
            Data.contractAddress, // Replace with the deployed HemaHope contract address
            HemaHopeABI.abi,
            signer
         );

         const options = {
            gasLimit: 300000, // Adjust the gas limit according to your needs
            gasPrice: ethers.utils.parseUnits('100', 'gwei'),
         };

         const response = await hemahope.createPhysicalItemCampaign(name, description, targetItems,duration, options);
         setName('');
         setDescription('');
         setTargetItems('')
        
         alert(`Campaign ${name} created successfully!`); 
      } catch (error) {
         console.error('Error creating campaign:', error.message);
         alert('Error creating campaign. Please try again.');
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
            <div className="wrapper-box p-relative">
               <div className="breadcrumb-bg" data-background="assets/img/breadcrumb/breadcrumb-bg.png"></div>
               <div className="breadcrumb-area pt-265 pb-230">
                  <div className="container">
                     <div className="row">
                        <div className="col-xl-12">
                           <div className="breadcrumb__content text-center">
                              <h1 className="breadcrumb__title">Create Campaigns</h1>
                              <div className="breadcrumb__list">
                                 <span><a href="/">Home</a></span>
                                 <span className="dvdr"><i className="fa-solid fa-colon"></i></span>
                                 <span className="underline">Campaigns</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <section className="about-text-area pt-90 pb-130">
               <div className="container">
                  <div className="row justify-content-center p-relative">
                     <div className="col-lg-10">
                        <div className="about-me-send-message">
                           {error && (
                              <div className="col-xl-12 mt-3">
                                 <div className="alert alert-danger" role="alert">
                                    {error}
                                 </div>
                              </div>
                           )}
                           {successMessage && (
                              <div className="col-xl-12 mt-3">
                                 <div className="alert alert-success" role="alert">
                                    {successMessage}
                                 </div>
                              </div>
                           )}
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
                                          <select
                                             type="text"
                                             placeholder="Target Items"
                                             value={targetItems}
                                             onChange={(e) => setTargetItems(e.target.value)}
                                             className="form-control"
                                          >

                                           <option value="Tents">Tents</option>
                                           <option value="Food">Food</option>
                                           <option value="Medicine">Medicine</option>
                                           <option value="School">School</option>
                                           <option value="Other">Other</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-xl-12">
                                       <div className="contact-input">
                                          <input
                                             type="number"
                                             placeholder="Duration"
                                             value={duration}
                                             onChange={(e) => setDuration(e.target.value)}
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
