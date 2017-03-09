import React from 'react';
import { formatPrice } from '../helpers.js';

class Fish extends React.Component {
  render() {
    const details = this.props.data;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out'
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
        <button disabled={ !isAvailable }>
          { buttonText }
        </button>
      </li>
    );
  }
}


export default Fish;