import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    event.preventDefault();
    const repo = (window.location.hostname.match(/github/)) ? `/${window.location.pathname.split('/')[1]}` : '';
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`${repo}/store/${storeId}`);
  }
  render() {

    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter A store</h2>
        <input type="text" ref={(input) => {
                                  this.storeInput = input
                                }} defaultValue={getFunName()} placeholder="Store Name" required />
        <button type="submit">Visit Store »</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
