import React, { Component } from 'react';
import Character from './Character.jsx.js';

class Board extends Component {

  /**
   * Renders the board layers in a stack.
   * All direct children of .play-area have the .board-layer class
   * which positions them absolutely so that they stack one on
   * top of the other.
   */
  render() {
    return (
        <div className="play-area">
          <div className="board">
            {/* The background of the board containing the image and grid */}
            <div className="board-layer">
              <img src="images/tatooine.jpg" alt=""/>
              <div className="grid"/>
            </div>

            {/* Our Hero, R2-D2 */}
            <Character
              id="hero"
              name={this.props.heroName}
              x={this.props.heroX}
              y={this.props.heroY}
              heading={this.props.heroHeading}
              isReporting={this.props.isReporting}
            />

            {/* The target, Obi Wan */}
            <Character
              id="target"
              name={this.props.targetName}
              x={this.props.targetX}
              y={this.props.targetY}
              heading={this.props.targetHeading}
              isReporting={this.props.isReporting}
            />
          </div>
        </div>
    );
  }
}

export default Board;
