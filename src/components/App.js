import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    }
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
  }

  addFish(fish) {
    const fishes = {
      ...this.state.fishes
    };
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    this.setState({
      fishes
    });
  }

  loadSamples() {
    console.info({
      sampleFishes
    });
    this.setState({
      fishes: sampleFishes
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            { Object
                .keys(this.state.fishes)
                .map(k => <Fish key={ k } data={ this.state.fishes[k] } />) }
          </ul>
        </div>
        <Order />
        <Inventory addFish={ this.addFish } loadSamples={ this.loadSamples } />
      </div>
    );
  }
}


export default App;