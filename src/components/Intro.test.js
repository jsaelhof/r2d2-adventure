import React from 'react';
import { shallow } from 'enzyme';
import Intro from './Intro.jsx';

it ('Calls intro complete callback when skip intro is clicked', () => {
  const mockOnIntroComplete = jest.fn();

  const wrapper = shallow(
    <Intro
      onIntroComplete={mockOnIntroComplete}
    />
  );

  const button = wrapper.find(".intro-skip");
  button.simulate('click');

  expect(mockOnIntroComplete.mock.calls.length).toEqual(1);
});

it ('Calls intro complete callback when crawl animation finishes', () => {
  const mockOnIntroComplete = jest.fn();

  const wrapper = shallow(
    <Intro
      onIntroComplete={mockOnIntroComplete}
    />
  );

  const element = wrapper.find(".crawl-content");
  element.simulate('animationend');

  expect(mockOnIntroComplete.mock.calls.length).toEqual(1);
});