import React, { Component } from "react";
import logoveri from '../img/layout_set_logo.png';
import logoback from '../img/arrow.png';

class Nav extends Component {
    
    handleReturn = () => {
        window.history.back()
    }

    render() {

        return (
            <nav className='nav'>
                <div>
                    <img src={logoveri} alt="veri" style={{width: '5rem'}}></img>
                </div>
                <div>
                    <button style={{background: 'transparent', border: 'none'}} onClick={()=> this.handleReturn()}><img src={logoback} alt="Back" style={{width: '2rem', height: '2rem'}}/></button>
                </div>
            </nav>
        );
    }
}

export default Nav;