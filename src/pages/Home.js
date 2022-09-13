import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import logoES from '../img/LogoES.png';

class Home extends Component {
  
 
    render() {
    
      return (
        <div className='background'>
          {/* <h1 style={{fontSize: '6rem', margin: '100px 0', width:'100%'}}>LA RULETA DE VERITAS</h1>  */}
          <h1 style={{margin: '50px auto', width:'100%'}}><img src={logoES} style={{margin: '0 auto', width:'33%'}}></img></h1>
          <div className="roulette-container">
            <Button 
              variant="success"
              value="spin" 
              href="/ca"
              className="button"  
              style={{
                fontFamily:'Suisse',
                fontSize:'2rem',
                margin: '3rem 0',
                borderRadius: '7rem',
                padding: '4rem 2rem',
              }} 
              id="spin">
              CATALÀ
            </Button>
          </div>
          <div className="roulette-container">
            <Button 
              variant="success"
              value="spin" 
              href={'/es'}
              className="button"  
              style={{
                fontFamily:'Suisse',
                fontSize:'2rem',
                margin: '3rem 0',
                borderRadius: '8rem',
                padding: '5rem 0.5rem',
              }} 
              id="spin">
              CASTELLANO
            </Button>
          </div>
        </div>
      );
    };
  };
export default Home;
