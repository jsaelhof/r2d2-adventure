import React, { Component } from 'react';

class Report extends Component {
  /**
   * Renders a panel containing information about the characters location.
   */
  render() {
    return (
        <div className="report">
          <div>{this.props.name}</div>
          <div>{ "X:" + this.props.x + ", Y:" + this.props.y + " (" + this.props.heading + ")" }</div>
        </div>
    );
  }
}

export default Report;
