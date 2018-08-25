import React, { Component } from 'react';
// import Home from './Components/Home/Home';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
      
        {routes()}
      </div>
    );
  }
}

export default App;
