import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './header';
import Footer from './footer';
import HemaHopeABI from '../HemaHope.json';

const ViewCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const provider = new ethers.providers.JsonRpcProvider('https://json-rpc.rolxtwo.evm.ra.blumbus.noisnemyd.xyz');
                const contract = new ethers.Contract('0x888257109FB3d6bB91d365Bd96F82E530df6605E', HemaHopeABI.abi, provider);
                const campaignCount = await contract.getCampaignCount();
                const campaignsData = [];

                for (let i = 0; i < campaignCount; i++) {
                    const campaign = await contract.campaigns(i);
                    campaignsData.push(campaign);
                }

                setCampaigns(campaignsData);
            } catch (error) {
                console.error('Error fetching campaigns:', error.message);
            }
        };

        fetchCampaigns();
    }, []);

    return (
        <>
            <Header />
            <main>
                <section className="campaign-list">
                    <div className="container">
                        <div className="row">
                            {campaigns.map((campaign, index) => (
                                <div key={index} className="col-lg-4 col-md-6">
                                    <div className="campaign-card">
                                        <h3>{campaign.name}</h3>
                                        <p>{campaign.description}</p>
                                        <p>Target Items: {campaign.targetItems}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ViewCampaign;
