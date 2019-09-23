import React, { Component } from "react";
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render () {
        return (
        <div>
            <img className="not" src='/assets/error-404.png' alt='404'/>
            <center><Link to="/">Return to Home Page</Link></center>
        </div>
        );
    }
};

export default NotFound;