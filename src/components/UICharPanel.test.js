import React from 'react';
import { shallow } from 'enzyme';
import UICharPanel from './UICharPanel.jsx.js';
import Compass from '../util/Compass';

it('contains correct setup before landing', () => {
  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={undefined}
      y={undefined}
      heading={undefined}
      allowMove={true}
    />
  );

  // Make sure the char portrait is set
  expect(wrapper.find('img').filterWhere(item => {
    return item.prop('src') === "/images/r2d2.jpg";
  })).toHaveLength(1);

  // Make sure the char map icon is set
  expect(wrapper.find('img').filterWhere(item => {
    return item.prop('src') === "/images/r2d2_map.png";
  })).toHaveLength(1);

  // Check that the X coord is set properly
  expect(wrapper.find('.ui-char-x').text()).toEqual("-");

  // Check that the Y coord is set properly
  expect(wrapper.find('.ui-char-y').text()).toEqual("-");

  // Check that the heading is set properly
  expect(wrapper.find('.ui-char-heading').text()).toEqual("-");
});


it('contains correct setup after landing', () => {
  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={10}
      y={20}
      heading={Compass.NORTH}
      allowMove={true}
    />
  );

  // Make sure the char portrait is set
  expect(wrapper.find('img').filterWhere(item => {
    return item.prop('src') === "/images/r2d2.jpg";
  })).toHaveLength(1);

  // Make sure the char map icon is set
  expect(wrapper.find('img').filterWhere(item => {
    return item.prop('src') === "/images/r2d2_map.png";
  })).toHaveLength(1);

  // Check that the X coord is set properly
  expect(wrapper.find('.ui-char-x').text()).toEqual("10");

  // Check that the Y coord is set properly
  expect(wrapper.find('.ui-char-y').text()).toEqual("20");

  // Check that the heading is set properly
  expect(wrapper.find('.ui-char-heading').text()).toEqual(Compass.NORTH);
});


it('contains correct buttons when move is enabled', () => {
  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={10}
      y={20}
      heading={Compass.NORTH}
      allowMove={true}
    />
  );

  // Make sure there are two ui-control-rows
  expect(wrapper.find(".ui-control-row")).toHaveLength(2);

  // Make sure the turn left button is present
  expect(wrapper.find('.ui-turn-left')).toHaveLength(1);

  // Make sure the turn right button is present
  expect(wrapper.find('.ui-turn-right')).toHaveLength(1);

  // Make sure the move control is present
  expect(wrapper.find(".ui-move")).toHaveLength(1);

  // Make sure the default move value is set properly
  expect(wrapper.find("input").prop("value")).toEqual(10);
});


it('does not contain move controls when move is disabled', () => {
  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={10}
      y={20}
      heading={Compass.NORTH}
      allowMove={false}
    />
  );

  // Make sure there is one ui-control-row
  expect(wrapper.find(".ui-control-row")).toHaveLength(1);

  // Make sure the turn left button is not included
  expect(wrapper.find('.ui-turn-left')).toHaveLength(0);

  // Make sure the turn right button is not included
  expect(wrapper.find('.ui-turn-right')).toHaveLength(0);

  // Make sure the move control is not included
  expect(wrapper.find(".ui-move")).toHaveLength(0);
});

it ('move control functions execute when clicked', () => {
  const mockLeftCallback = jest.fn();
  const mockRightCallback = jest.fn();
  const mockMoveCallback = jest.fn();

  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={10}
      y={20}
      heading={Compass.NORTH}
      allowMove={true}
      onTurnLeft={mockLeftCallback}
      onTurnRight={mockRightCallback}
      onMove={mockMoveCallback}
    />
  );

  const left = wrapper.find('.ui-turn-left');
  left.simulate('click');
  expect(mockLeftCallback.mock.calls.length).toEqual(1);

  const right = wrapper.find('.ui-turn-right');
  right.simulate('click');
  expect(mockRightCallback.mock.calls.length).toEqual(1);

  const move = wrapper.find('.ui-move').find("button");
  move.simulate('click');
  expect(mockMoveCallback.mock.calls.length).toEqual(1);
});


it ('move control input sets state', () => {
  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={10}
      y={20}
      heading={Compass.NORTH}
      allowMove={true}
    />
  );

  const moveInput = wrapper.find(".ui-move").find("input");
  moveInput.simulate('change', { target: { value: "15" } } );
  expect(wrapper.state().moveValue).toEqual(15);
});


it ('move control reports correct value on click', () => {
  const mockMoveCallback = jest.fn();

  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={10}
      y={20}
      heading={Compass.NORTH}
      allowMove={true}
      onMove={mockMoveCallback}
    />
  );

  // Simulate typing in 15
  const moveInput = wrapper.find(".ui-move").find("input");
  moveInput.simulate('change', { target: { value: "15" } } );

  // Simulate clicking the move button
  const move = wrapper.find('.ui-move').find("button");
  move.simulate('click');

  // Check that the callback provides an argument of 15
  expect(mockMoveCallback).toHaveBeenCalledWith(15);
});


it ('move control reports correct value on click when field is blank', () => {
  const mockMoveCallback = jest.fn();

  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={10}
      y={20}
      heading={Compass.NORTH}
      allowMove={true}
      onMove={mockMoveCallback}
    />
  );

  // Simulate backspacing all the chars in the field
  const moveInput = wrapper.find(".ui-move").find("input");
  moveInput.simulate('change', { target: { value: "" } } );

  // Simulate clicking the move button
  const move = wrapper.find('.ui-move').find("button");
  move.simulate('click');

  // Check that the callback provides an argument of ""
  expect(mockMoveCallback).toHaveBeenCalledWith("");
});

it ('blocks or allows keycodes appropriately', () => {
  const allowedKeyCodes = [8,37,39,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105];

  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={10}
      y={20}
      heading={Compass.NORTH}
      allowMove={true}
    />
  );

  const moveInput = wrapper.find(".ui-move").find("input");

  for (var i=0; i<=127; i++) {
    let mockPreventDefault = jest.fn();
    
    moveInput.simulate( 'keydown', { 
      keyCode: i,
      preventDefault: mockPreventDefault
    } );

    // Check that prevent default is called 1 time if the key code is not allowed and 0 times if it is allowed
    expect(mockPreventDefault.mock.calls.length).toEqual( allowedKeyCodes.indexOf(i) < 0 ? 1 : 0 );
  }
});


it ('blocks key modifiers', () => {
  const wrapper = shallow(
    <UICharPanel
      portrait="/images/r2d2.jpg"
      mapIcon="/images/r2d2_map.png"
      x={10}
      y={20}
      heading={Compass.NORTH}
      allowMove={true}
    />
  );

  const moveInput = wrapper.find(".ui-move").find("input");

  ["ctrlKey","altKey","shiftKey","metaKey"].forEach( modifier => {
    let mockPreventDefault = jest.fn();
    
    moveInput.simulate( 'keydown', { 
      [modifier]: true,
      preventDefault: mockPreventDefault
    } );

    // Check that prevent default is called
    expect(mockPreventDefault.mock.calls.length).toEqual(1);
  } )
});