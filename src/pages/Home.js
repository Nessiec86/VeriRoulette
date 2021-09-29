import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Home extends Component {
  
 
    render() {
    
      return (
        <div className='background'>
          <h1 style={{fontSize: '6rem', margin: '100px 0', width:'100%'}}>LA RULETA DE VERITAS</h1> 
          <div className="roulette-container">
            <Button 
              variant="success"
              value="spin" 
              href="/ca"
              className="button"  
              style={{
                fontFamily:'Verifont',
                fontSize:'3rem',
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
                fontFamily:'Verifont',
                fontSize:'3rem',
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
