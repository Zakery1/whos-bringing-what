import React, { Component } from 'react';
import routes from './routes';
import Nav from './Components/Nav/Nav';
import Error from './Components/Error/Error';

class App extends Component {
  componentDidMount(){
    document.title="Who's Bringing What?"
  }
  
  render() {
    return (
      <Error>
      <div className="App">
          
          <div className="app_nav_container big">
            <Nav/>
          </div>

          <div className="app_routes_container">
            {routes}
          </div>
          <div className="app_nav_container small">
            <Nav/>
          </div>

      </div>
      </Error>
    );
  }
}

export default App;
