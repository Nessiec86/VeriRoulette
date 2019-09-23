import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoveri from '../img/layout_set_logo.png';
import arrow from '../img/back.svg';

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
                {/* <div>
                    <button onClick={()=> this.handleReturn()}><img src={arrow} alt="log" style={{width: '2.5rem', height: '1rem'}}/></button>
                </div> */}
            </nav>
        );
    }
}

export default Nav;