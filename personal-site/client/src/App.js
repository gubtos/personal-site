import React, {Component} from 'react';
import logo from './logo.svg';
//import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Companies from './components/Companies';

class App extends Component {
  render(){
    return (
      <div>
        <Companies></Companies>
      </div>
    );
  }
}

export default App;
