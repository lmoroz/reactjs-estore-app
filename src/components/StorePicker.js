import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {


  goToStore(event) {
    event.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
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

  static contextTypes = {
    router: React.PropTypes.object
  }


}


export default StorePicker;
