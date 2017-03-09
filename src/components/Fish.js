import React from 'react';

class Fish extends React.Component {
  render() {
    return (
      <div>
        { this.props.name }
        { this.props.price }
        { this.props.status }
        { this.props.desc }
        { this.props.image }
      </div>
    );
  }
}


export default Fish;