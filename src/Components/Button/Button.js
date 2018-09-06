import React, { Component } from 'react';


class Button extends Component {
  state = {
    count: 0
  }

  render() {
    return (
      <div >
          <button className='inc' onClick={() => this.setState({count: this.state.count + 1})}>Increase</button>
          <button className='dec' onClick={() => this.setState({count: this.state.count - 1})}>Decrease</button>
      </div>
    );
    }
}