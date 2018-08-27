import React, { Component } from 'react';
import routes from './routes';
import Nav from './Components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="App_navContainer">
            <Nav/>
          </div>
          <div className="App_routesContainer">
            {routes}
          </div>
      </div>
    );
  }
}

export default App;
