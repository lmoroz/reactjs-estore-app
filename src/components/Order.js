import React from 'react';
import { formatPrice } from '../helpers.js';

class Order extends React.Component {
  render() {
    const {fishes, order} = this.props;
    let total = 0;
    return (
      <div>
        <ul className="order-list">
          {Object.keys(order).map(fish_id => {
             const item_subtotal = fishes[fish_id].price * order[fish_id];
             total += item_subtotal;
             return (
               <li className="order-item">
                 <span className="order-item-name">{fishes[fish_id].name}</span>
                 <span className="order-item-subtotal">{formatPrice(item_subtotal)}</span></li>
             )
           })}
        </ul>
        <div className="order-total">
          Total:
          <span className="order-total-num">{formatPrice(total)}</span>
        </div>
      </div>
    );
  }
}

export default Order;
