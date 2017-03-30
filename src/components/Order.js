import React from 'react';
import { formatPrice } from '../helpers.js';

class Order extends React.Component {
  render() {
    const {fishes, order} = this.props;
    let total = 0;
    return (
      <div className="order-wrap">
        <h2>Your order</h2>
        <ul className="order">
          {Object.keys(order).map(key => {
             const fishAvail = fishes[key] && fishes[key].status === 'available';
             const removeButton = <button onClick={(e) => this.props.removeFromOrder(key)}>×</button>
             if (fishAvail) {
               const item_subtotal = (fishes[key].price || 0) * (order[key] || 0);
               total += item_subtotal;
               return (
                 <li className="order-item" key={key}>
                   <span className="order-item-name">{order[key]}lbs of {fishes[key].name}</span>
                   <span className="order-item-subtotal">{formatPrice(item_subtotal)}</span>
                   {removeButton}
                 </li>
               )
             }
             else return (
                 <li className="order-item" key={key}>
                   Sorry,
                   {fishes[key] ? ` ${fishes[key].name}` : ' fish'} is no longer available!
                   {removeButton}
                 </li>
             )
           })}
          <li className="total">
            <strong>Total:</strong>
            <span className="order-total-num">{formatPrice(total)}</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Order;
