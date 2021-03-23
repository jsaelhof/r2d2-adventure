import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import Compass from '../util/Compass';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it ('onIntroComplete hides the intro component', () => {
  const wrapper = shallow(
    <App/>
  );

  wrapper.instance().onIntroComplete();

  expect(wrapper.state().showIntro).toBe(false);
  expect(wrapper.exists(".game")).toBe(true);
});


it ('onLand randomly sets state of hero and target', () => {
  const wrapper = shallow(
    <App/>
  );

  wrapper.instance().onLand();

  expect(wrapper.state().isLanded).toBe(true);
  expect(wrapper.state().heroX).toBeDefined();
  expect(wrapper.state().heroX).not.toBeNaN();
  expect(wrapper.state().heroY).toBeDefined();
  expect(wrapper.state().heroY).not.toBeNaN();
  expect(wrapper.state().heroHeading).toBeDefined();
  expect(wrapper.state().heroHeading).toMatch(/[NESW]/);
  expect(wrapper.state().heroAxis).toBeDefined();
  expect(wrapper.state().heroAxis).toMatch(/[XY]/);
  expect(wrapper.state().heroVector).toBeDefined();
  expect(wrapper.state().heroVector).toMatch(/[+-]/);
  expect(wrapper.state().targetX).toBeDefined();
  expect(wrapper.state().targetX).not.toBeNaN();
  expect(wrapper.state().targetY).toBeDefined();
  expect(wrapper.state().targetY).not.toBeNaN();
  expect(wrapper.state().targetHeading).toBeDefined();
  expect(wrapper.state().targetHeading).toMatch(/[NESW]/);
});

it ('ignores a second landing', () => {
  const wrapper = shallow(
    <App/>
  );

  wrapper.instance().onLand();

  let heroX = wrapper.state().heroX;
  let heroY = wrapper.state().heroY;
  let heroHeading = wrapper.state().heroHeading;
  let targetX = wrapper.state().targetX;
  let targetY = wrapper.state().targetY;
  let targetHeading = wrapper.state().targetHeading;

  wrapper.instance().onLand();

  expect(wrapper.state().heroX).toEqual(heroX);
  expect(wrapper.state().heroY).toEqual(heroY);
  expect(wrapper.state().heroHeading).toEqual(heroHeading);
  expect(wrapper.state().targetX).toEqual(targetX);
  expect(wrapper.state().targetY).toEqual(targetY);
  expect(wrapper.state().targetHeading).toEqual(targetHeading);
});

it ('sets isReporting', () => {
  // Mock timers. The onReport function creates a timer that executes later.
  jest.useFakeTimers();

  const wrapper = shallow(
    <App/>
  );

  // Create a spy on the onReportComplete fucntion that will be called when the timer completes
  const spyOnReportComplete = jest.spyOn(wrapper.instance(), 'onReportComplete');

  wrapper.instance().onReport();
  expect(wrapper.state().isReporting).toBe(true);

  // Fast-forward all timers
  jest.runAllTimers();

  // Make sure the onReportComplete function was called and the state has been correctly updated
  expect(spyOnReportComplete).toBeCalled();
  expect(spyOnReportComplete).toHaveBeenCalledTimes(1);
  expect(wrapper.state().isReporting).toBe(false);
});

it ('Ignores a call to report if already reporting', () => {
  const wrapper = shallow(
    <App/>
  );

  // Create a spy on the onReportComplete fucntion that will be called when the timer completes
  const spyOnReportComplete = jest.spyOn(wrapper.instance(), 'onReportComplete');

  // Call onReport
  wrapper.instance().onReport();
  expect(wrapper.state().isReporting).toBe(true);

  // Call onReport a second time before the first one has finished.
  wrapper.instance().onReport();

  // Fast-forward all timers
  jest.runAllTimers();

  // Make sure the onReportComplete function was called only once.
  expect(spyOnReportComplete).toBeCalled();
  expect(spyOnReportComplete).toHaveBeenCalledTimes(1);
  expect(wrapper.state().isReporting).toBe(false);
});

it ('Moves the hero correctly when given valid move values', () => {
  const wrapper = shallow(
    <App/>
  );

  // Land the characters
  wrapper.instance().onLand();

  // Override their random locations so we can test movement in a consistent way.
  wrapper.setState( {
    heroX: 40,
    heroY: 50,
    heroHeading: Compass.NORTH,
    heroAxis: Compass.Y_AXIS,
    heroVector: Compass.POS_VECTOR,
    targetX: 60,
    targetY: 70,
    targetHeading: Compass.SOUTH
  } );

  wrapper.instance().onMove(1);

  // Check that the hero moved one square in the positive Y direction
  expect(wrapper.state().heroX).toEqual(40);
  expect(wrapper.state().heroY).toEqual(51);
  expect(wrapper.state().heroHeading).toEqual(Compass.NORTH);

  // Turn right to face East and move 1.
  wrapper.instance().onTurnRight();
  wrapper.instance().onMove(1);

  // Check that the hero moved one square in the positive X direction
  expect(wrapper.state().heroX).toEqual(41);
  expect(wrapper.state().heroY).toEqual(51);
  expect(wrapper.state().heroHeading).toEqual(Compass.EAST);

  // Turn right to face South and move 1.
  wrapper.instance().onTurnRight();
  wrapper.instance().onMove(1);

  // Check that the hero moved one square in the negative Y direction
  expect(wrapper.state().heroX).toEqual(41);
  expect(wrapper.state().heroY).toEqual(50);
  expect(wrapper.state().heroHeading).toEqual(Compass.SOUTH);

  // Turn right to face West and move 1.
  wrapper.instance().onTurnRight();
  wrapper.instance().onMove(1);

  // Check that the hero moved one square in the negative X direction
  expect(wrapper.state().heroX).toEqual(40);
  expect(wrapper.state().heroY).toEqual(50);
  expect(wrapper.state().heroHeading).toEqual(Compass.WEST);
});


it ('Ignores the move and displays the error when given an invalid value', () => {
  const wrapper = shallow(
    <App/>
  );

  // Land the characters
  wrapper.instance().onLand();

  // Override their random locations so we can test movement in a consistent way.
  wrapper.setState( {
    heroX: 99,
    heroY: 99,
    heroHeading: Compass.NORTH,
    heroAxis: Compass.Y_AXIS,
    heroVector: Compass.POS_VECTOR,
    targetX: 60,
    targetY: 70,
    targetHeading: Compass.SOUTH
  } );

  wrapper.instance().onMove(1);

  // Check that the hero did not move in the positive Y direction
  expect(wrapper.state().heroX).toEqual(99);
  expect(wrapper.state().heroY).toEqual(99);
  expect(wrapper.state().heroHeading).toEqual(Compass.NORTH);
  expect(wrapper.state().showInvalidMove).toEqual(true);

  // Reset the invalid move dialog
  wrapper.setState({ showInvalidMove: false });

  // Turn right to face East and move 1.
  wrapper.instance().onTurnRight();
  wrapper.instance().onMove(1);

  // Check that the hero did not move in the positive X direction
  expect(wrapper.state().heroX).toEqual(99);
  expect(wrapper.state().heroY).toEqual(99);
  expect(wrapper.state().heroHeading).toEqual(Compass.EAST);
  expect(wrapper.state().showInvalidMove).toEqual(true);

  // Warp the hero to a new location to test the 0 boundaries
  wrapper.setState({
    heroX: 0,
    heroY: 0,
    heroHeading: Compass.SOUTH,
    heroAxis: Compass.Y_AXIS,
    heroVector: Compass.NEG_VECTOR,
    showInvalidMove: false
  });

  // Move 1.
  wrapper.instance().onMove(1);

  // Check that the hero did not move in the negative Y direction
  expect(wrapper.state().heroX).toEqual(0);
  expect(wrapper.state().heroY).toEqual(0);
  expect(wrapper.state().heroHeading).toEqual(Compass.SOUTH);
  expect(wrapper.state().showInvalidMove).toEqual(true);

  // Reset the invalid move dialog
  wrapper.setState({ showInvalidMove: false });

  // Turn right to face West and move 1.
  wrapper.instance().onTurnRight();
  wrapper.instance().onMove(1);

  // Check that the hero did not move in the negative X direction
  expect(wrapper.state().heroX).toEqual(0);
  expect(wrapper.state().heroY).toEqual(0);
  expect(wrapper.state().heroHeading).toEqual(Compass.WEST);
  expect(wrapper.state().showInvalidMove).toEqual(true);
});


it ('correctly handles checking for the winning conditions', () => {
  const wrapper = shallow(
    <App/>
  );

  // Land the characters
  wrapper.instance().onLand();

  // Override their random locations so we can test movement in a consistent way.
  wrapper.setState( {
    heroX: 10,
    heroY: 10,
    heroHeading: Compass.NORTH,
    heroAxis: Compass.Y_AXIS,
    heroVector: Compass.POS_VECTOR,
    targetX: 11,
    targetY: 11,
    targetHeading: Compass.SOUTH
  } );

  // Move the character. At this point he should be beside, but not at the same coord as the target
  wrapper.instance().onMove(1);
  expect(wrapper.state().heroX).toEqual(10);
  expect(wrapper.state().heroY).toEqual(11);
  expect(wrapper.state().heroHeading).toEqual(Compass.NORTH);

  // The victory condition has not been met.
  expect(wrapper.state().showWin).toEqual(false);

  // Move the character. At this point he should find the target
  wrapper.instance().onTurnRight();
  wrapper.instance().onMove(1);
  expect(wrapper.state().heroX).toEqual(11);
  expect(wrapper.state().heroY).toEqual(11);
  expect(wrapper.state().heroHeading).toEqual(Compass.EAST);

  // The victory condition has been met. The celebration dialog should show.
  expect(wrapper.state().showWin).toEqual(true);
});

it ('turns left', () => {
  const wrapper = shallow(
    <App/>
  );

  // Land the characters
  wrapper.instance().onLand();

  // Override their random locations so we can test movement in a consistent way.
  wrapper.setState( {
    heroX: 10,
    heroY: 10,
    heroHeading: Compass.NORTH,
    heroAxis: Compass.Y_AXIS,
    heroVector: Compass.POS_VECTOR
  } );

  // Turn the character to the left (West)
  wrapper.instance().onTurnLeft();
  expect(wrapper.state().heroHeading).toEqual(Compass.WEST);

  // Turn the character to the left (South)
  wrapper.instance().onTurnLeft();
  expect(wrapper.state().heroHeading).toEqual(Compass.SOUTH);

  // Turn the character to the left (East)
  wrapper.instance().onTurnLeft();
  expect(wrapper.state().heroHeading).toEqual(Compass.EAST);

  // Turn the character to the left (North)
  wrapper.instance().onTurnLeft();
  expect(wrapper.state().heroHeading).toEqual(Compass.NORTH);
});


it ('turns right', () => {
  const wrapper = shallow(
    <App/>
  );

  // Land the characters
  wrapper.instance().onLand();

  // Override their random locations so we can test movement in a consistent way.
  wrapper.setState( {
    heroX: 10,
    heroY: 10,
    heroHeading: Compass.NORTH,
    heroAxis: Compass.Y_AXIS,
    heroVector: Compass.POS_VECTOR
  } );

  // Turn the character to the right (East)
  wrapper.instance().onTurnRight();
  expect(wrapper.state().heroHeading).toEqual(Compass.EAST);

  // Turn the character to the right (South)
  wrapper.instance().onTurnRight();
  expect(wrapper.state().heroHeading).toEqual(Compass.SOUTH);

  // Turn the character to the right (West)
  wrapper.instance().onTurnRight();
  expect(wrapper.state().heroHeading).toEqual(Compass.WEST);

  // Turn the character to the right (North)
  wrapper.instance().onTurnRight();
  expect(wrapper.state().heroHeading).toEqual(Compass.NORTH);
});

it ('hides the invalid move dialog', () => {
  const wrapper = shallow(
    <App/>
  );

  // Simulate showing the invalid move dialog
  wrapper.setState( {
    showInvalidMove: true
  } );

  // Call the handled to hide the dialog
  wrapper.instance().onHideInvalidMove();
  expect(wrapper.state().showInvalidMove).toEqual(false);
});

it ('resets the state of the game', () => {
  const wrapper = shallow(
    <App/>
  );

  // Land the characters to create state that should be reset.
  wrapper.instance().onLand();

  // Call onEndGame to reset the game.
  wrapper.instance().onEndGame();

  expect(wrapper.state().heroX).toBeUndefined();
  expect(wrapper.state().heroY).toBeUndefined();
  expect(wrapper.state().heroHeading).toBeUndefined();
  expect(wrapper.state().heroAxis).toBeUndefined();
  expect(wrapper.state().heroVector).toBeUndefined();
  expect(wrapper.state().targetX).toBeUndefined();
  expect(wrapper.state().targetY).toBeUndefined();
  expect(wrapper.state().targetHeading).toBeUndefined();
  expect(wrapper.state().isLanded).toBe(false);
  expect(wrapper.state().showWin).toBe(false);
});