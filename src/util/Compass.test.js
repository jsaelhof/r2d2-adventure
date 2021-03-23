import React from 'react';
import Compass from './Compass';

it ('gets a random heading', () => {
  // Run 50 iterations to make sure all cases are hit.
  for (let i=0; i<50; i++) {
    expect(Compass.getRandomHeading().heading).toMatch(/[NESW]/);
  }
});

it ('gets a properly formed north heading', () => {
  let compass = Compass.getCompassForHeading(Compass.NORTH);

  let expectedCompass = {
    axis: Compass.Y_AXIS,
    heading: Compass.NORTH,
    vector: Compass.POS_VECTOR,
    toLeft: Compass.WEST,
    toRight: Compass.EAST,
    degrees: 0
  };

  expect(compass).toMatchObject(expectedCompass);
});

it ('gets a properly formed south heading', () => {
  let compass = Compass.getCompassForHeading(Compass.SOUTH);

  let expectedCompass = {
    axis: Compass.Y_AXIS,
    heading: Compass.SOUTH,
    vector: Compass.NEG_VECTOR,
    toLeft: Compass.EAST,
    toRight: Compass.WEST,
    degrees: 180
  };

  expect(compass).toMatchObject(expectedCompass);
});

it ('gets a properly formed west heading', () => {
  let compass = Compass.getCompassForHeading(Compass.WEST);

  let expectedCompass = {
    axis: Compass.X_AXIS,
    heading: Compass.WEST,
    vector: Compass.NEG_VECTOR,
    toLeft: Compass.SOUTH,
    toRight: Compass.NORTH,
    degrees: 270
  };

  expect(compass).toMatchObject(expectedCompass);
});

it ('gets a properly formed east heading', () => {
  let compass = Compass.getCompassForHeading(Compass.EAST);

  let expectedCompass = {
    axis: Compass.X_AXIS,
    heading: Compass.EAST,
    vector: Compass.POS_VECTOR,
    toLeft: Compass.NORTH,
    toRight: Compass.SOUTH,
    degrees: 90
  };

  expect(compass).toMatchObject(expectedCompass);
});

it ('turns left 90 correctly', () => {
  expect(Compass.left90(Compass.NORTH).heading).toEqual(Compass.WEST);
  expect(Compass.left90(Compass.WEST).heading).toEqual(Compass.SOUTH);
  expect(Compass.left90(Compass.SOUTH).heading).toEqual(Compass.EAST);
  expect(Compass.left90(Compass.EAST).heading).toEqual(Compass.NORTH);
});

it ('turns right 90 correctly', () => {
  expect(Compass.right90(Compass.NORTH).heading).toEqual(Compass.EAST);
  expect(Compass.right90(Compass.WEST).heading).toEqual(Compass.NORTH);
  expect(Compass.right90(Compass.SOUTH).heading).toEqual(Compass.WEST);
  expect(Compass.right90(Compass.EAST).heading).toEqual(Compass.SOUTH);
});

it ('converts a heading to degress', () => {
  expect(Compass.headingToDegrees(Compass.NORTH)).toEqual(0);
  expect(Compass.headingToDegrees(Compass.EAST)).toEqual(90);
  expect(Compass.headingToDegrees(Compass.SOUTH)).toEqual(180);
  expect(Compass.headingToDegrees(Compass.WEST)).toEqual(270);
});