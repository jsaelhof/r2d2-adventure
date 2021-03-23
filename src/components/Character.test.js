import React from 'react';
import { shallow } from 'enzyme';
import Character from './Character.jsx';
import Report from './Report.jsx.js';
import Compass from '../util/Compass.js';

it('renders if x, y, and heading are provided', () => {
  const wrapper = shallow(
    <Character
      id="hero"
      name="R2-D2"
      x={10}
      y={20}
      heading={Compass.NORTH}
    />
  );

  expect(wrapper.exists(".board-layer")).toBe(true);
});

it('Does not render if x is undefined', () => {
  const wrapper = shallow(
    <Character
      id="hero"
      name="R2-D2"
      x={undefined}
      y={20}
      heading={Compass.NORTH}
    />
  );

  expect(wrapper.exists(".board-layer")).toBe(false);
});

it('Does not render if y is undefined', () => {
  const wrapper = shallow(
    <Character
      id="hero"
      name="R2-D2"
      x={10}
      y={undefined}
      heading={Compass.NORTH}
    />
  );

  expect(wrapper.exists(".board-layer")).toBe(false);
});

it('Does not render if heading is undefined', () => {
  const wrapper = shallow(
    <Character
      id="hero"
      name="R2-D2"
      x={10}
      y={20}
      heading={undefined}
    />
  );

  expect(wrapper.exists(".board-layer")).toBe(false);
});

it('Configures correctly when isReporting is true', () => {
  const wrapper = shallow(
    <Character
      id="hero"
      name="R2-D2"
      x={10}
      y={20}
      heading={Compass.NORTH}
      isReporting={true}
    />
  );

  expect(wrapper.exists(".char-report")).toBe(true);

  expect(wrapper.contains(
    <Report
      name="R2-D2"
      heading={Compass.NORTH}
      x={10}
      y={20}
    />
  )).toBe(true);
});


it('Renders the character sprite with the correct class', () => {
  const wrapper = shallow(
    <Character
      id="hero"
      name="R2-D2"
      x={10}
      y={20}
      heading={Compass.NORTH}
    />
  );

  expect(wrapper.exists(".char-hero")).toBe(true);
});

it('Renders the character sprite with the correct class', () => {
  // Get each compass point object which contains the heading and degrees and test each one.
  [
    Compass.getCompassForHeading(Compass.NORTH),
    Compass.getCompassForHeading(Compass.EAST),
    Compass.getCompassForHeading(Compass.SOUTH),
    Compass.getCompassForHeading(Compass.WEST)
  ].forEach( compass => {
    const wrapper = shallow(
      <Character
        id="hero"
        name="R2-D2"
        x={10}
        y={20}
        heading={compass.heading}
      />
    );

    expect(wrapper.find(".char-hero").get(0).props.style).toHaveProperty("transform", "rotate( "+ compass.degrees +"deg )");
  } );
});

it('Calculates the correct top and left offset for the given x/y coord', () => {
  [
    { x:0, y:0, expectedTop: 796, expectedLeft: 4 },
    { x:99, y:99, expectedTop: 4, expectedLeft: 796 },
    { x:50, y:50, expectedTop: 396, expectedLeft: 404 },
    { x:23, y:77, expectedTop: 180, expectedLeft: 188 }
  ].forEach( testData => {
      const wrapper = shallow(
        <Character
          id="hero"
          name="R2-D2"
          x={testData.x}
          y={testData.y}
          heading={Compass.NORTH}
        />
      );

      expect(wrapper.find(".char").get(0).props.style).toHaveProperty("top", testData.expectedTop);
      expect(wrapper.find(".char").get(0).props.style).toHaveProperty("left", testData.expectedLeft);
  } );
  
});