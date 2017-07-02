import React from 'react';
import { formatPrice } from '../helpers.js';
import CSSTransitionGroup from 'react-addons-css-transition-group'

class Order extends React.Component {
  render() {
    const {fishes, order} = this.props;
    let total = 0;
    return (
      <div className="order-wrap">
        <h2>Your order</h2>
        <CSSTransitionGroup className="order" component="ul" transitionName="order" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {Object.keys(order).map(key => {
             const count = order[key];
             const fishAvail = fishes[key] && fishes[key].status === 'available';
             const removeButton = <button onClick={(e) => this.props.removeFromOrder(key)}>×</button>
             if (fishAvail) {
               const item_subtotal = (fishes[key].price || 0) * (order[key] || 0);
               total += item_subtotal;
               return (
                 <li className="order-item" key={key}>
                   <span>
                                                                                                                                                                                                                                                                                      <CSSTransitionGroup className="count" component="span" transitionName="count" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                                                                                                                                                                                                                                                                                       <span key={count}>{count}</span>
                   </CSSTransitionGroup>
                   lbs of
                   {fishes[key].name}
                   {removeButton}
                   </span>
                   <span className="order-item-subtotal">{formatPrice(item_subtotal)}</span>
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
        </CSSTransitionGroup>
      </div>
    );
  }

  static propTypes = {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeFromOrder: React.PropTypes.func.isRequired,
  }

}


export default Order;
