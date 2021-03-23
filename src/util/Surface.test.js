import React from 'react';
import Surface from './Surface';

it ('gets a random coordinate on the surface', () => {
  // Run a thousand iterations of the funciton to make sure there is good coverage of randomly generated values in both dimensions.
  for (let i=0; i<1000; i++) {
    let randomCoord = Surface.getRandomCoordOnSurface();
    expect(randomCoord.x).toBeDefined();
    expect(randomCoord.y).toBeDefined();
    expect(randomCoord.x).toBeGreaterThanOrEqual(0);
    expect(randomCoord.x).toBeLessThanOrEqual(99);
    expect(randomCoord.y).toBeGreaterThanOrEqual(0);
    expect(randomCoord.y).toBeLessThanOrEqual(99);
  }
});