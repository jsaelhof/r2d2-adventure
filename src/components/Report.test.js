import React from 'react';
import { shallow } from 'enzyme';
import Report from './Report.jsx';
import Compass from '../util/Compass';

it('renders report data correctly', () => {
  const wrapper = shallow(
    <Report
      name="R2-D2"
      x={10}
      y={20}
      heading={Compass.NORTH}
    />
  );

  // Report ndoe renders
  expect(wrapper.exists(".report")).toBe(true);

  // First element should be the Name
  expect(wrapper.find(".report").childAt(0).text()).toEqual("R2-D2");

  // Second element should report the X, Y and Heading
  expect(wrapper.find(".report").childAt(1).text()).toEqual("X:10, Y:20 (N)");
});