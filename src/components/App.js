import React from 'react';
import base from '../base';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';


class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    this.state = {
      fishes: {},
      order: {}
    }
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

  updateFish(key, updatedFish) {
    const fishes = {
      ...this.state.fishes
    };
    fishes[key] = updatedFish;
    this.setState({
      fishes
    });
  }

  removeFish(key) {
    const fishes = {
      ...this.state.fishes
    };
    // delete fishes[key];
    fishes[key] = null; //due to Firebase
    this.setState({
      fishes
    });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    const order = {
      ...this.state.order
    };
    order[key] = (order[key] + 1) || 1
    this.setState({
      order
    });
  }

  removeFromOrder(key) {
    const order = {
      ...this.state.order
    };
    delete order[key];
    this.setState({
      order
    });
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    const localStorageRef = localStorage.getItem(`${this.props.params.storeId}/order`);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnMount() {
    base.removeBinding(this.ref);
  }


  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`${this.props.params.storeId}/order`, JSON.stringify(nextState.order));
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object
               .keys(this.state.fishes)
               .map(k => <Fish key={k} index={k} addToOrder={this.addToOrder} details={this.state.fishes[k]} />)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} removeFromOrder={this.removeFromOrder} />
        <Inventory addFish={this.addFish} updateFish={this.updateFish} removeFish={this.removeFish} loadSamples={this.loadSamples} fishes={this.state.fishes}
          storeId={this.props.params.storeId} />
      </div>
    );
  }
}



App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;