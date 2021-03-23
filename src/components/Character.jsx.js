import React, { Component } from 'react';
import Surface from '../util/Surface';
import Compass from '../util/Compass';
import Report from './Report.jsx.js';

class Character extends Component {

  /**
   * Renders a character as a layer on the board as long as we have the required location information.
   * 
   * The character is composed of two divs, one inside the other.
   * The outer div is used to manage the character's translation in the X or Y direction
   * and is center-registered.
   * The inner 'sprite' layer contains the actual image and is used to control which
   * direction the character is facing by rotating the sprite inside the outer div.
   * 
   * Moving the character is done by mutliplying the number of pixels in a grid space by the coordinate value.
   * In the X, we have to add a 1/2 grid space so that the sprite is centered on the space.
   * In the case of the Y, we have to invert it because HTML's 0,0 is top/left while our 0,0 is bottom/left.
   * We also have to further subtract a 1/2 grid space worth of pixels because our registration point
   * for the character sprite is still top/left.
   */
  render() {
    // See if the character should be rendered.
    // I'm not using the shorted "if (!this.props.x ...)" syntax for the coords because it will be fooled by a valid coordinate of 0 which is falsey.
    if (this.props.x === undefined || this.props.y === undefined || !this.props.heading) {
      return null;
    }

    return (
      <div className="board-layer">

        {/* Outer character div used to control translation in the X and Y and centering within the grid space. */}
        <div 
          className={ this.props.isReporting ? "char char-report" : "char" } 
          style={ 
            { 
              top: (Surface.HEIGHT - (this.props.y * Surface.GRID_SIZE)) - (Surface.GRID_SIZE/2), 
              left: (this.props.x * Surface.GRID_SIZE) + Surface.GRID_SIZE/2
            }
          }>

          {/* Inner 'sprite' div which displays the character image and controls it's rotation. */}
          <div className={"char-sprite char-"+this.props.id}
            style={
              {
                transform: "rotate( " + Compass.headingToDegrees(this.props.heading) + "deg )"
              }
            }
          />
          
          {/* If reporting, the Report component is displayed and shows a panel containing 
              information about the character's current location. 
              This is included inside the outer div so that the report panel follows the character.
          */}
          { this.props.isReporting ?
              <Report 
                name={this.props.name}
                heading={this.props.heading}
                x={this.props.x}
                y={this.props.y}
              />
              :
              null
          }
          
        </div>
      </div>
    );
  }
}

export default Character;
