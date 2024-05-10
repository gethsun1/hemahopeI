//react-portfolio/src/App.jsx
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar.jsx';
import About from './components/about/About.jsx';
import Projects from './components/Projects/Projects.jsx';
import CarouselImages from './components/Carousel/Carousel.jsx';

class App extends Component {
  state = {
    isWalletConnected: false,
  };


  handleWalletConnect = () => {
    ConnectWalletFunction().then(() => {
      this.setState({ isWalletConnected: true });
    });
  };
  



  render() {
    const { isWalletConnected } = this.state;
    return (
      <Router>
        <div className='App'>
          <div className='side'>
            <nav className='navbar side navbar-expand-lg navbar-light p-0'>
              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                style={{ zIndex: '1' }}
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <Sidebar isWalletConnected={isWalletConnected} onConnect={this.handleWalletConnect} />
              </div>
            </nav>
          </div>
          <div className='main'>
            <CarouselImages />
            <About />
            <Projects />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
