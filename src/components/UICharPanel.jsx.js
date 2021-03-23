import React, { Component } from 'react';

/**
 * Creates a panel in the UI for one character.
 * Move commands are optionally toggled on or off.
 */
class UICharPanel extends Component {

  constructor () {
    super();

    // The moveValue, which is tied to the move inut field,
    // is stored here so that it can be sent along when the move button is pressed.
    this.state = {
        moveValue: 10
    }

    // Bind functions used as event handlers
    // Binding here instead of in the render method prevents anonymous functions from being re-declared everytime the render occurs
    this.onMoveInputChanged = this.onMoveInputChanged.bind(this);
    this.onMoveInputKeyDown = this.onMoveInputKeyDown.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  /**
   * Intercepts the user's typing and blocks input of invalid characters.
   * @param {object} event The keyboard down event describing the key pressed
   */
  onMoveInputKeyDown ( event ) {
    // Prevent any modifier keys
    if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        event.preventDefault();
        return;
    }

    // Get the key code from the event
    let k = event.keyCode;

    // Prevent any keystroke that does not match these values
    if ( 
        !((k >= 48 && k <= 57) || // 0-9
        (k >= 96 && k <= 105) || // Numpad 0-9
        (k === 8) || // Backspace
        (k === 37) || // Left Arrow
        (k === 39)) // Right Arrow
    ) {
        event.preventDefault();
        return;
    }
  }

  /**
   * Called when the user changes the value in the move input field.
   * @param {object} e An event allowing us to reference the field.
   */
  onMoveInputChanged ( e ) {
    // Parse an integer from the target field.
    // Due to restricting valid input using keydown, this will always be an integer
    // except in the case where they backspace the entire value to an empty string.
    // In that case isNaN will be true and we will set an empty string as the value.
    // The parent components in the app know how to handle an empty string value
    // for the number of units.
    let units = parseInt(e.target.value);

    this.setState( {
      moveValue: isNaN(units) ? "" : units
    } );
  }

  /**
   * Called when the move button is pressed.
   * Sends the number of units (or empty string) currenty typed into the move input field.
   */
  onMove () {
    this.props.onMove( this.state.moveValue );
  }

  /**
   * Renders the character panel, with or without move controls.
   * Note that before the X, Y and heading are set, we will display "-" as a placeholder.
   * The check for X and Y specifically test for undefined because 0 is a valid coordinate
   * but is falsey and will trip up a check like !this.props.x.
   */
  render() {
    return (
        <div className="ui-char-panel">
            <div className="ui-char-portrait">
                <img src={this.props.portrait} alt=""/>
                <img src={this.props.mapIcon} className="ui-char-portrait-icon" alt=""/>
            </div>
            <div>
                <div className="ui-control-row">
                    <div className="ui-control">
                        <div className="ui-char-x ui-control-value">{ this.props.x !== undefined ? this.props.x : "-" }</div>
                        <div className="ui-control-label">X Coord</div>
                    </div>
                    <div className="ui-control">
                        <div className="ui-char-y ui-control-value">{ this.props.y !== undefined ? this.props.y : "-" }</div>
                        <div className="ui-control-label">Y Coord</div>
                    </div>
                    <div className="ui-control">
                        <div className="ui-char-heading ui-control-value">{ this.props.heading || "-" }</div>
                        <div className="ui-control-label">Heading</div>
                    </div>
                </div>
                { this.props.allowMove ?
                    <div className="ui-control-row">
                        <div className="ui-control"> 
                            <div className="ui-turn-left" onClick={this.props.onTurnLeft}/>
                            <div className="ui-control-label">Left</div>
                        </div>
                        <div className="ui-control ui-move">
                            <input 
                                type="text" 
                                onChange={this.onMoveInputChanged} 
                                onKeyDown={this.onMoveInputKeyDown} 
                                value={this.state.moveValue}
                                maxLength="3">
                            </input>
                            <button className="app-button app-button-small" onClick={this.onMove}>Move</button>
                        </div>
                        <div className="ui-control"> 
                            <div className="ui-turn-right" onClick={this.props.onTurnRight}/>
                            <div className="ui-control-label">Right</div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
  }
}

export default UICharPanel;
