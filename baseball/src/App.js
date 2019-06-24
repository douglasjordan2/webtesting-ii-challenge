import React, { Component } from 'react';
import Display from './Components/Display';
import Dashboard from './Components/Dashboard';


class App extends Component {
  state = {
    balls: 0,
    strikes: 0,
    outs: 0
  }

  inc = (type, amount) => {
    const { strikes } = this.state;

    if(type === 'fouls') {
      this.setState({ strikes: strikes < 2 ? strikes + 1 : 2 })
    } else if(type === 'balls') {
      this.setState({ 
        balls: amount === 4 ? 0 : amount,
        outs: amount === 4 ? this.state.outs + 1 === 3 ? 0 : this.state.outs + 1 : this.state.outs 
      })
    } else if(type === 'strikes') {
      this.setState({ 
        strikes: amount === 3 ? 0 : amount,
        outs: amount === 3 ? this.state.outs + 1 === 3 ? 0 : this.state.outs + 1 : this.state.outs
      })
    } else {
      this.setState({
        balls: 0,
        strikes: 0,
        hit: false
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <Display 
          state = { this.state }
        />
        <Dashboard 
          inc = { this.inc }
          state = { this.state }
        />
      </div>
    );
  }
}

export default App;
