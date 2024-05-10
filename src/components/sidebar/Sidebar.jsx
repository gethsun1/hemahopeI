//react-portfolio/src/components/sidebar/Sidebar.jsx
import React from 'react';
import './Sidebar.css';
import { HashLink as Link } from 'react-router-hash-link';
import { motion } from 'framer-motion';
import WalletConnection from '../WalletConnection/WalletConnection'; // Import the WalletConnection component
import logo from '../images/favicon.png';

export default function Sidebar({ isWalletConnected, onConnect }) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className='sidebar'>
      <h1>
        <Link smooth to='/#start' className='h1_links'>
          Hema Hope
        </Link>
      </h1>
      <motion.div
        animate={{ y: [2, -2] }}
        transition={{ ease: 'linear', duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      >
        <img src={logo} className='my-img' alt='logo' />
      </motion.div>
      <p style={{ color: 'black', fontWeight: 'bold' }} className='gmail'>
        &nbsp; &nbsp;Empowering Philanthropy: Transparent Giving, Token Rewards, Community Impact
      </p>

      <ul className='sidebar-nav'>
        <li className='sidebar-nav-items'>
          <Link smooth to='/#projects' className='links'>
            Active Campaigns
          </Link>
        </li>
        <li className='sidebar-nav-items'>
          <Link smooth to='/#about' className='links'>
            About
          </Link>
        </li>
        <li className='sidebar-nav-items'>
          <Link smooth to='/#interest' className='links'>
            Create Campaign
          </Link>
        </li>
        <li className='sidebar-nav-items'>
          <Link smooth to='/#education' className='links'>
            Donate
          </Link>
        </li>
        {!isWalletConnected && <WalletConnection onConnect={onConnect} />} 
      </ul>
    </div>
  );
}
