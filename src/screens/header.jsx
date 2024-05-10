import React, { useState,useEffect } from 'react';
import { ethers } from 'ethers';
const Header = ({ onConnect }) => {
    const [connected, setConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const connectMyWallet = async () => {
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
    }
    const truncateAddress = (address) => {
        const maxLength = 8;
        if (address.length <= maxLength) {
            return address;
        } else {
            return address.substring(0, maxLength) + '...';
        }
    };
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
            <div id="loading">
                <div id="loading-center">
                    <div id="loading-center-absolute">

                        <div className="tp-preloader-content">
                            <div className="tp-preloader-icon text-center">
                                <span className="tp-preloader-animation">
                                    <img src="/assets/img/hema hope-04.png" style={{ width: 100 }} alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header id="header-sticky" className="transparent-header header__sticky">
                <div className="header-area header-area-2 header__space pt-40">
                    <div className="container-fluid">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-xl-2 col-lg-2 col-md-6 col-6">
                                <div className="logo">
                                    <a href="/">
                                        <img src="/assets/img/home hope transparent on white.png" style={{ width: 100 }} />
                                    </a>
                                </div>
                            </div>
                            <div className="d-none d-xl-block col-xl-6 col-lg-6">
                                <div className="main-menu main-menu-2 menu__space">
                                    <nav id="tp-mobile-menu">
                                        <ul>
                                            <li>
                                                <a href="/">Home</a>
                                            </li>

                                            <li className="has-dropdown">
                                                <a href="#">Donation</a>
                                                <ul className="submenu">
                                                    <li><a href="/campaigns">Donation listing</a></li>
                                                    <li><a href="/create_campaign">Create Listing</a></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <a href="/about">About</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-6">
                                <div className="header-right d-none d-lg-flex align-items-center justify-content-end">
                                    <div className="header-icon">

                                    </div>
                                    <div className="header-btn">
                                       
                                        {
                                            !connected && <a className="tp-btn tp-btn-shine-effect" href="#" onClick={connectMyWallet}><span>CONNECT WALLET</span></a>
                                        }
                                        {
                                            connected && <a className="tp-btn tp-btn-shine-effect" href="#" onClick={connectMyWallet}><span>{truncateAddress(walletAddress)}</span></a>
                                        }
                                        
                                    </div>
                                </div>
                                <div className="mobile-menu d-xl-none">
                                    <button className="tp-side-action tp-toogle hamburger-btn">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="fix">
                <div className="tp-side-info">
                    <div className="tp-side-logo">
                        <a href="index.html">
                            <img src="/assets/img/logo/logo.png" alt="logo" />
                        </a>
                    </div>
                    <div className="tp-side-close">
                        <button> <i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="tp-mobile-menu-pos"></div>
                    <div className="tp-side-content">
                        <div className="tp-side-content__inner-btn mb-100">
                            <a href="#" className="tp-btn">Donate now</a>
                        </div>
                        <div className="tp-contact-info d-flex flex-column">
                            <a href="tel:088245684379"><i className="fa-solid fa-phone-flip"></i> +254712345678</a>
                            <a className="mail" href="mailto:infomai.@mail.com">info@hemahope.com</a>
                        </div>
                        <div className="tpfooter__social tpside-social">
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-youtube"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-overlay"></div>
            </div>
        </>
    )
}
export default Header;