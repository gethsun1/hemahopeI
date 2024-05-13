import Header from './header'
import Footer from './footer'
import React, { useState,useEffect } from 'react';
import { ethers } from 'ethers';
const CreateCampaign = ()=>{
   const [connected, setConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const getConnectedWallet = async()=>{
      if (window.ethereum) {
          try {
       
              const accounts = await window.ethereum.request({ method: 'eth_accounts' });
              if (accounts.length > 0) {
                  const provider = new ethers.providers.Web3Provider(window.ethereum);
                  const signer = provider.getSigner();
                  const address = await signer.getAddress();
                  setWalletAddress(address);
                  setConnected(true);
                  onConnect(signer);
              } else {
                  console.error('No accounts connected');
              }
          } catch (error) {
              console.error('Error checking wallet connection:', error.message);
          }
      } else {
          console.error('Ethereum wallet not detected');
      }

 
  }
  useEffect(()=>{
      getConnectedWallet()
  },[])
 return (
    <>
     <Header/>
     <main>
     <div className="wrapper-box p-relative">
         <div className="breadcrumb-bg" data-background="assets/img/breadcrumb/breadcrumb-bg.png"></div>
         <div className="breadcrumb-area pt-265 pb-265">
            <div className="container">
               <div className="row">
                  <div className="col-xl-12">
                     <div className="breadcrumb__content text-center">
                        <h1 className="breadcrumb__title">Create Listing</h1>
                        <div className="breadcrumb__list">
                           <span><a href="index.html">Home</a></span>
                           <span className="dvdr"><i className="fa-solid fa-colon"></i></span>
                           <span className="underline">Create Listing</span>
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
               <div className="col-lg-8">
                  <h3 className="about-me-send-message-title">Create Listing</h3>
               </div>
               <div className="col-lg-10">
                  <div className="about-me-send-message">
                     <div className="contact-form">
                        <form action="#">
                           <div className="row">
                              <div className="col-xl-6 col-lg-6">
                                 <div className="contact-input">
                                    <input type="text" placeholder="Enter your Name"/>
                                 </div>
                              </div>
                              <div className="col-xl-6 col-lg-6">
                                 <div className="contact-input">
                                    <input type="text" placeholder="Enter you mail"/>
                                 </div>
                              </div>
                              <div className="col-xl-12">
                                 <div className="contact-input">
                                    <textarea placeholder="Enter your message"></textarea>
                                 </div>
                                 <div className="about-me-btn text-center">
                                    <button className="tp-btn-black tp-btn-shine-effect">Add</button>
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
    <Footer/>
    </>
   
 )
}
export default CreateCampaign