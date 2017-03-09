import React from 'react';
import { formatPrice } from '../helpers.js';

class Fish extends React.Component {
  render() {
    const details = this.props.data;
    return (
      <li className="menu-fish">
        <img src={ details.image } alt={ details.name } />
        <h3 className="fish-name">
      			{ details.name }
      			<span className="price">{ formatPrice(details.price) }</span>
      			</h3>
        <p>
          { details.desc }
        </p>
        <button>Add To Order</button>
      </li>
    );
  }
}


export default Fish;