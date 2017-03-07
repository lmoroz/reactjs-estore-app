import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    event.preventDefault();
    const value = this.storeInput.value;
    console.log({
      "this": this,
      "this.storeInput": this.storeInput,
      value
    });
  }
  render() {

    return (
      <form className="store-selector" onSubmit={ (e) => this.goToStore(e) }>
        <h2>Please Enter A store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={ getFunName() } ref={ (input) => {
                                                                                                   this.storeInput = input
                                                                                                 } } />
        <button type="submit">Visit Store »</button>
      </form>
    )
  }
}

export default StorePicker;