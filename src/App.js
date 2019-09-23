import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Canvas from './pages/Canvas';
import NotFound from './Components/NotFound';
require('dotenv').config();

class App extends Component {
  
  render () {  
    return (
      <Switch>
        <Route exact path="/" component={Canvas} />
        <Route path='*' exact={true} component={NotFound} />
      </Switch>
    );
  }
}

export default App;