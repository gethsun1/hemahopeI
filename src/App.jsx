//react-portfolio/src/App.jsx
import React, { Component } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './screens/home'
import About from './screens/about'
import Campaigns from './screens/campaigns'
import ViewCampaigns from './screens/view_campaign'
import CreateCampaign from './screens/create_campaign'
const App = () => {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/campaigns",
      element: <Campaigns />,
    },
    {
      path: "/view_campaign",
      element: <ViewCampaigns />,
    },
    {
      path: "/create_campaign",
      element: <CreateCampaign />,
    },
    
    
  ]);



  return (
    <div className="page-wrapper" >
      <RouterProvider router={router} />
    </div>
  );

}

export default App;
