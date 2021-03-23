import React, { Component } from 'react';
import UICharPanel from './UICharPanel.jsx';

class UI extends Component {
  /**
   * Renders the left-hand UI.
   * This consists of two character panels and the report button.
   * Note that Obi Wan's panel has the move control disabled.
   */
  render() {
    return (
      <div className="ui">
        {/* R2-D2 */}
        <UICharPanel 
          portrait="/images/r2d2.jpg"
          mapIcon="/images/r2d2_map.png"
          x={this.props.heroX}
          y={this.props.heroY}
          heading={this.props.heroHeading}
          allowMove={true}
          onTurnLeft={this.props.onTurnLeft}
          onTurnRight={this.props.onTurnRight}
          onMove={this.props.onMove}
        />

        {/* Obi Wan */}
        <UICharPanel 
          portrait="/images/obiwan.jpg"
          mapIcon="/images/obiwan_map.png"
          x={this.props.targetX}
          y={this.props.targetY}
          heading={this.props.targetHeading}
          allowMove={false}
        />
        
        {/* Report Button */}
        <div className="ui-control-row">
          <button className="app-button ui-control" onClick={this.props.onReport}>Report</button>
        </div>
      </div>
    );
  }
}

export default UI;
