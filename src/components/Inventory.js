import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {

  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];

    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" placeholder="Fish Name" value={fish.name} onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" placeholder="Fish Price" value={fish.price} onChange={(e) => this.handleChange(e, key)} />
        <select name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}>
          {fish.desc}
        </textarea>
        <input name="image" type="text" placeholder="Fish Image" value={fish.image} onChange={(e) => this.handleChange(e, key)} />
        <button onClick={(e) => this.props.removeFish(key)}>- Remove Item</button>
      </div>
    );
  }


  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    );
  }
}


export default Inventory;