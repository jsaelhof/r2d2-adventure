import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board.jsx';
import Character from './Character.jsx.js';
import Compass from '../util/Compass';

it('constructs the board correctly', () => {
  const wrapper = shallow(
    <Board
      boundaryX={100}
      boundaryY={50}
      heroName="R2-D2"
      heroX={10}
      heroY={20}
      heroHeading={Compass.WEST}
      targetName="Obi Wan"
      targetX={30}
      targetY={40}
      targetHeading={Compass.SOUTH}
      isReporting={true}
    />
  );

  expect(wrapper.exists(".play-area")).toBe(true);

  expect(wrapper.find(Character).first().props().id).toBe("hero");
  expect(wrapper.find(Character).first().props().name).toBe("R2-D2");
  expect(wrapper.find(Character).first().props().x).toBe(10);
  expect(wrapper.find(Character).first().props().y).toBe(20);
  expect(wrapper.find(Character).first().props().heading).toBe(Compass.WEST);
  expect(wrapper.find(Character).first().props().isReporting).toBe(true);

  expect(wrapper.find(Character).last().props().id).toBe("target");
  expect(wrapper.find(Character).last().props().name).toBe("Obi Wan");
  expect(wrapper.find(Character).last().props().x).toBe(30);
  expect(wrapper.find(Character).last().props().y).toBe(40);
  expect(wrapper.find(Character).last().props().heading).toBe(Compass.SOUTH);
  expect(wrapper.find(Character).last().props().isReporting).toBe(true);
});
