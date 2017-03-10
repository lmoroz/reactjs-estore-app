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
          {Object.keys(order).map(fish_id => {
             const fishAvail = fishes[fish_id] && fishes[fish_id].status === 'available';
             const item_subtotal = (fishes[fish_id].price || 0) * (order[fish_id] || 0);
             if (fishAvail) {
               total += item_subtotal;
               return (
                 <li className="order-item" key={fish_id}>
                   <span className="order-item-name">{fishes[fish_id].name}</span>
                   <span className="order-item-subtotal">{formatPrice(item_subtotal)}</span>
                 </li>
               )
             }
             else return (
                 <li className="order-item" key={fish_id}>
                   Sorry,
                   {fishes[fish_id] ? fishes[fish_id].name : 'fish'} is no longer available!
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
