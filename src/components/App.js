import React, { Component } from 'react';
import '../css/App.css';
import UI from './UI.jsx.js';
import Board from './Board.jsx.js';
import Compass from '../util/Compass';
import Modal from './Modal.jsx.js';
import Surface from '../util/Surface';
import Intro from './Intro.jsx.js';
import Resize from '../util/Resize';

class App extends Component {

  constructor () {
    super();

    this.state = {
      showIntro: true,                  // Indicates if the intro screen should be displayed
      boundaryX: Surface.X_SIZE,        // X boundary of the game grid
      boundaryY: Surface.Y_SIZE,        // Y Boundary of the game grid
      heroName: "R2-D2",                // Name of our hero
      heroX: undefined,                 // X coordinate of hero
      heroY: undefined,                 // Y coordinate of hero
      heroHeading: undefined,           // Compass heading of hero (N, S, E or W)
      heroAxis: undefined,              // Axis hero is currently moving on (X or Y)
      heroVector: undefined,            // Direction the hero is moving on axis (+ or -)
      targetName: "Obi Wan",            // Name of the target
      targetX: undefined,               // X coordinate of target
      targetY: undefined,               // Y coordinate of target
      targetHeading: undefined,         // Compass heading of target (N, S, E or W)
      isLanded: false,                  // Indicates if the characters have landed on the planet
      isReporting: false,               // Indicates if the report is being displayed
      showInvalidMove: false,           // Indicates if the invalid move dialog should be displayed
      showWin: false                    // Indicates if the win dialog should be displayed
    }

    // Bind functions used as event handlers
    // Binding here instead of in the render method prevents anonymous functions from being re-declared everytime the render occurs
    this.onIntroComplete = this.onIntroComplete.bind(this);
    this.onLand = this.onLand.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onTurnLeft = this.onTurnLeft.bind(this);
    this.onTurnRight = this.onTurnRight.bind(this);
    this.onReport = this.onReport.bind(this);
    this.onHideInvalidMove = this.onHideInvalidMove.bind(this);
    this.checkForWinningCondition = this.checkForWinningCondition.bind(this);
    this.onReportComplete = this.onReportComplete.bind(this);
    this.onEndGame = this.onEndGame.bind(this);
  }

  componentWillMount () {
    // Assign the resize function to execute on window.onResize.
    window.onresize = Resize;
  }

  componentWillUnmount () {
    // Remove the resizing.
    window.onresize = undefined;
  }

  /**
   * Called when the Intro component completes. 
   * Call resize manually to initially resize the game to the current viewport 
   * (window.onResize only runs when the viewport changes)
   */
  onIntroComplete () {
    this.setState( {
      showIntro: false
    }, Resize );
  }

  /**
   * Called when the Land button is pressed.
   * Randomly generates initial coordinates for both characaters.
   */
  onLand () {
    // If the characters have already landed, ignore any further calls.
    if (this.state.isLanded) return;

    // Get R2-D2's starting location.
    let heroCoord = Surface.getRandomCoordOnSurface();

    // Get Obi Wan's location. Make sure it isn't the same location as R2-D2's
    let targetCoord;
    while (!targetCoord || (targetCoord.x === heroCoord.x && targetCoord.y === heroCoord.y)) {
      targetCoord = Surface.getRandomCoordOnSurface();
    }

    // Get random compass information for both characters.
    let heroCompass = Compass.getRandomHeading();
    let targetCompass = Compass.getRandomHeading();

    // Save all randomly generated information.
    // When complete, call the onReport function to initial highlight where the characters landed.
    this.setState( {
      isLanded: true,
      heroX: heroCoord.x,
      heroY: heroCoord.y,
      heroHeading: heroCompass.heading,
      heroAxis: heroCompass.axis,
      heroVector: heroCompass.vector,
      targetX: targetCoord.x,
      targetY: targetCoord.y,
      targetHeading: targetCompass.heading 
    }, this.onReport );
  }

  /**
   * Called when the report button is pressed.
   * This function sets a short timeout that clears the report when finished.
   */
  onReport () {
    // If the report is already displayed, do not show it again.
    // This prevents overlapping timers.
    if (!this.state.isReporting) {
      this.setState({
        isReporting: true
      }, () => { 
        setTimeout(this.onReportComplete, 3000) 
      } );
    }
  }

  /**
   * Called by the timeout set in onReport to clear the report display.
   */
  onReportComplete () {
    this.setState({
      isReporting: false
    });
  }

  /**
   * Moves the hero the specified number of units.
   * @param {number} units The number of units to move the hero. Always a positive integer value.
   */
  onMove ( units ) {
    // If the hero is facing in a heading that would move negatively in cartesian space, invert the units.
    // This allows to always use addition when performing the move instead having to if/else the operator.
    if (this.state.heroVector === "-") units = -units;

    // Find the new location of the hero after the move is executed.
    // This value may be invalid in terms of where it exists within the grid.
    let newCoord = this.state["hero"+this.state.heroAxis] + units;

    // Make sure the new location is valid.
    // If so, move the hero. If not, show an error.
    if ( 
      (this.state.heroVector === "-" && newCoord >= 0) || 
      (this.state.heroVector === "+" && newCoord < this.state["boundary"+this.state.heroAxis]) 
    ) {
      // This is a legal move.
      // Update the hero location in state and then check if hero has found the target.
      // I'm an ES6 computed property name here so that I don't have to check the axis to figure out which coord to update.
      this.setState(
        {
          ["hero"+this.state.heroAxis]: newCoord
        }, 
        this.checkForWinningCondition
      );
    } else {
      // This is an illegal Move
      // Set the state flag to show the invalid move dialog.
      this.setState({
        showInvalidMove: true
      });
    }
  }

  /**
   * Called by the onMove function after each valid move.
   * Checks to see if the hero and target are at the same coordinate.
   */
  checkForWinningCondition () {
    if ( this.state.heroX === this.state.targetX && this.state.heroY === this.state.targetY ) {
      this.setState( {
        showWin: true
      } );
    }
  }

  /**
   * Called by the Turn Left button in the UI.
   */
  onTurnLeft () {
    this.turn(Compass.left90(this.state.heroHeading));
  }

  /**
   * Called by the Turn Right button in the UI.
   */
  onTurnRight () {
    this.turn(Compass.right90(this.state.heroHeading));
  }

  /**
   * Called when turning in either direction.
   * Sets the hero's data related to his new direction.
   * @param {object} compassReading A set of values describing a compass heading
   */
  turn ( compassReading ) {
    this.setState( {
      heroHeading: compassReading.heading,
      heroVector: compassReading.vector,
      heroAxis: compassReading.axis
    });
  }

  /**
   * Called by the button that closes the Invalid Move dialog.
   */
  onHideInvalidMove () {
    this.setState({
      showInvalidMove: false
    });
  }

  /**
   * Called by the button that closes the win dialog.
   * Resets the app state so that the game can be played again without rewatching the intro.
   */
  onEndGame () {
    this.setState( {
      heroX: undefined,
      heroY: undefined,
      heroHeading: undefined,
      heroAxis: undefined,
      heroVector: undefined,
      targetX: undefined,
      targetY: undefined,
      targetHeading: undefined,
      isLanded: false,
      showWin: false
    } );
  }

  /**
   * Render the app.
   * There are two main app views, the intro and the game.
   */
  render() {
    if (this.state.showIntro) {
      return (
        <Intro
          onIntroComplete={this.onIntroComplete} 
        />
      );
    } else {
      return (
        <div className="game">
          {/* Create the left-hand UI. */}
          <UI
            isLanded={this.state.isLanded}
            heroX={this.state.heroX}
            heroY={this.state.heroY}
            heroHeading={this.state.heroHeading}
            targetX={this.state.targetX}
            targetY={this.state.targetY}
            targetHeading={this.state.targetHeading}
            onLand={this.onLand}
            onMove={this.onMove}
            onTurnLeft={this.onTurnLeft}
            onTurnRight={this.onTurnRight}
            onReport={this.onReport}
          />

          {/* Create the game board */}
          <Board
            width={this.state.boundaryX}
            height={this.state.boundaryY}
            heroName={this.state.heroName}
            heroX={this.state.heroX}
            heroY={this.state.heroY}
            heroHeading={this.state.heroHeading}
            targetName={this.state.targetName}
            targetX={this.state.targetX}
            targetY={this.state.targetY}
            targetHeading={this.state.targetHeading}
            isReporting={this.state.isReporting}
          />

          {/* Modal dialog configured for the landing phase. */}
          <Modal
            show={!this.state.isLanded}
            image="/images/land.jpg"
            message="R2-D2's escape pod is about to crash land on Tatooine! Hang On!"
            subtext="R2-D2 will land randomly on the surface where he will begin his journey to find Obi Wan Kenobi and deliver the stolen plans."
            buttonText="Land"
            onConfirm={this.onLand}
          />

          {/* Modal dialog configured to display when an invalid move occurs. */}
          <Modal
            show={this.state.showInvalidMove}
            image="/images/sarlacc.jpg"
            message="Uh Oh. You better not go in that direction..."
            subtext="Invalid Move. You cannot leave the area."
            buttonText="Ok"
            onConfirm={this.onHideInvalidMove}
          />

          {/* Modal dialog configured to display when the game is won. */}
          <Modal
            show={this.state.showWin}
            image="/images/celebrate.jpg"
            message="Congratulations, you've saved the Rebellion!"
            buttonText="Replay"
            onConfirm={this.onEndGame}
          />
        </div>
      );
    }
  }
}

export default App;
