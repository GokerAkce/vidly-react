import React, { Component } from 'react';
import Movies from './components/movies';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <Movies />
      </React.Fragment>
      );
  }
}
 
export default App;