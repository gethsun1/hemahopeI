import React, { Component } from 'react';
import classes from './About.module.css';


class About extends Component {
  render() {
    return (
      <div className={classes.box} id='about'>
     

        <span className={classes.head}>HEMA HOPE</span>
        <h2 className={classes.heading}>Who We Are?</h2>
        <div className={classes.About}>
          <p className="about-text">
            At <b>Hema Hope</b>, we believe in redefining philanthropy for a better world. Our platform is more than just a charity tool; it's a movement towards transparency, community empowerment, and impactful giving.
            <br /><br />
            With traditional charities often lacking transparency and community involvement, Pata Hema steps in with a revolutionary approach. We introduce decentralized governance through a DAO (Decentralized Autonomous Organization), offer tokenized incentives to drive engagement, and implement transparent reporting mechanisms for fund utilization and project impact.
            <br /><br />
            By leveraging blockchain technology and the power of community-driven decision-making, we're fostering a culture of collaboration, trust, and positive social change. Join us on this journey to create a future where communities lead the way in driving meaningful impact and creating a more equitable world. Together, we can make a difference that truly matters.
          </p>
          <hr class="section-divider"></hr>
        </div>
            
      </div>
      
    );
  }
}

export default About;
