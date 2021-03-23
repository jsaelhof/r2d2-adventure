import React from 'react';
import { shallow } from 'enzyme';
import UI from './UI.jsx';
import UICharPanel from './UICharPanel.jsx.js';
import Compass from '../util/Compass';

it('contains correct setup before landing', () => {
  const wrapper = shallow(
    <UI
      isLanded={false}
      heroX={undefined}
      heroY={undefined}
      heroHeading={undefined}
      targetX={undefined}
      targetY={undefined}
      targetHeading={undefined}
    />
  );

  expect(wrapper.find(UICharPanel)).toHaveLength(2);
  expect(wrapper.find("button")).toHaveLength(1);
});

it('contains correct setup after landing', () => {
  const wrapper = shallow(
    <UI
      isLanded={true}
      heroX={10}
      heroY={20}
      heroHeading={Compass.NORTH}
      targetX={30}
      targetY={40}
      targetHeading={Compass.WEST}
    />
  );

  expect(wrapper.find(UICharPanel)).toHaveLength(2);
  expect(wrapper.find("button")).toHaveLength(1);
});
