//react-portfolio/src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Home from './screens/home'

const App = ()=> {
   return (
      <Home/>
    );
  
}

export default App;
