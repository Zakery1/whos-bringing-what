import React, { Component } from 'react';
import routes from './routes';
import Nav from './Components/Nav/Nav';

class App extends Component {
  componentDidMount(){
    document.title="Who's Bringing What?"
  }
  
  render() {
    return (
      <div className="App">

          <div className="App_navContainer big">
            <Nav/>
          </div>

          <div className="App_routesContainer">
            {routes}
          </div>
          <div className="App_navContainer small">
            <Nav/>
          </div>

      </div>
    );
  }
}

export default App;
