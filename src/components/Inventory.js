import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {

  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth(
      (user) => {
        if (user) {
          this.authHandler(null, user);
        }
      }
    );
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }


  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    if (err) return;

    const storeRef = base.database().ref(this.props.storeId);
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};


      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });


    })
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('google')}>Log In with Google</button>
      </nav>
    )
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
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // check if user logged in
    if (!this.state.uid) {
      return (
        <div>
          {this.renderLogin()}
        </div>)
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you aren't owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    );
  }
}



Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string
}

export default Inventory;