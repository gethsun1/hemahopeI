import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import Header from './header'
import Footer from './footer'
import HemaHopeABI from '../HemaHope.json';
import Data from './config'

const Campaign = () => {
   const [campaigns, setCampaigns] = useState([])


   // RETRIEVE
   const getCampaigns = async () => {
      
         try {
            if(window.ethereum){
               console.log(111)
               const provider = new ethers.providers.Web3Provider(window.ethereum);
               console.log(2222)
               const signer = provider.getSigner();
               console.log(333)
               const hemahope = new ethers.Contract(
                  Data.contractAddress,
                  HemaHopeABI.abi,
                  signer
               );
               console.log(4444)
               
   
   
   
               const response = await hemahope.getAllCampaigns();
               const campaings = []
               if(Array.isArray(response)){
                  response.map(async(item)=>{
                     const c = await hemahope.getCampaignDetails(item)
                     let object = {
                        name:c[0],
                        description:c[1],
                        targetItems:c[2]
                     }
                     setTimeout(()=>{
                        setCampaigns([object].concat(campaigns))
                     },3000)
                
                  })
                  
               }
               else
               {
                  const c = await hemahope.getCampaignDetails(response)
                  let object = {
                     name:c[0],
                     description:c[1],
                     targetItems:c[2]
                  }
                  
                  setCampaigns([object].concat(campaigns))

               }
            }
            
         }
         catch(err){
            console.log(err)
         }
       
   }


   useEffect(() => {
      getCampaigns()
   }, [])
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
                              <h1 className="breadcrumb__title">Donation listing</h1>
                              <div className="breadcrumb__list">
                                 <span><a href="/">Home</a></span>
                                 <span className="dvdr"><i className="fa-solid fa-colon"></i></span>
                                 <span className="underline">Campains</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="donation-list-area pt-100 pb-130">
               <div className="container">
                  <div className="row tp-gx-20">
                     {
                        campaigns.length > 0 &&
                        campaigns.map((campaign, index) => {
                           return (
                              <div key={index + 1} className="col-xl-4 col-lg-4 col-md-6">
                                 <div className="donation-card-box wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".3s">
                                    <div className="card-item">
                                       <div className="tpcard__wrapper white-bg">
                                          <div className="tpcard__img">
                                             <a href="donation-details.html"><img src="/assets/img/hema hope-04.png" alt="" /></a>
                                          </div>
                                          <div className="tpcard__content">
                                             <h4 className="tpcard__title"><a href="donation-details.html">{campaign.name}</a>
                                             </h4>
                                             <div className="tpcard__progresss">
                                                <div className="progress">
                                                   <div className="progress-bar" role="progressbar" aria-label="Example with label"
                                                      style={{ width: 75 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                      <span>75%</span>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="tpcard__bottom d-flex justify-content-between">
                                                <div className="tpcard__details">
                                                   <span className="subtitle">our goal</span> <br />
                                                   <span className="sale">$34.0000</span>
                                                </div>
                                                <div className="tpcard__details">
                                                   <span className="subtitle">Raised</span> <br />
                                                   <span className="sale">$11.9098</span>
                                                </div>
                                                <div className="tpcard__details">
                                                   <span className="subtitle">to go</span> <br />
                                                   <span className="sale">$56,000</span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           )
                        })
                     }
                     {
                        campaigns.length === 0 &&
                        <div className="text-align:center">
                           <strong>No Campaigns Found</strong>
                        </div>
                     }



                     {/* <div className="donation-list-pagination wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                  <nav className="donation-pagination mt-20" aria-label="...">
                     <ul className="pagination justify-content-center">
                        <li className="page-item">
                           <a className="page-link" href="donation-listing.html"><i className="fa-regular fa-arrow-left"></i></a>
                        </li>
                        <li className="page-item"><a className="page-link" href="donation-listing.html">1</a></li>
                        <li className="page-item active" aria-current="page">
                           <span className="page-link">2</span>
                        </li>
                        <li className="page-item"><a className="page-link" href="donation-listing.html">3</a></li>
                        <li className="page-item">
                           <a className="page-link" href="donation-listing.html"><i className="fa-regular fa-arrow-right"></i></a>
                        </li>
                     </ul>
                  </nav>
               </div> */}
                  </div>
               </div>
            </div>
         </main>
         <Footer />
      </>
   )
}
export default Campaign