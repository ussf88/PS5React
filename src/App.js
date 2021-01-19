import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from './Component/Layout';
import axios from 'axios';


class App extends Component {




  render(){
  return (
    <div className="App">
      <Layout/>
    </div>
  );
}
}

export default App;
