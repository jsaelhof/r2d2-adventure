import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal.jsx';

it('hides the modal when show is false', () => {
  const wrapper = shallow(
    <Modal
      show={false}
    />
  );

  expect(wrapper.exists(".modal-hidden")).toBe(true);
});

it('shows the modal when show is true', () => {
  const wrapper = shallow(
    <Modal
      show={true}
    />
  );

  expect(wrapper.exists(".modal-shown")).toBe(true);
});

it('sets the specified image source', () => {
  const wrapper = shallow(
    <Modal
      image="/images/test.jpg"
    />
  );

  expect(wrapper.find("img").prop("src")).toEqual("/images/test.jpg");
});


it('sets the specified message', () => {
  const wrapper = shallow(
    <Modal
      message="Test Message"
    />
  );

  expect(wrapper.find(".modal-message").text()).toEqual("Test Message");
});


it('sets the specified subtext', () => {
  const wrapper = shallow(
    <Modal
      subtext="Subtext Message"
    />
  );

  expect(wrapper.find(".modal-subtext").text()).toEqual("Subtext Message");
});


it('sets the subtext to an empty string when undefined', () => {
  const wrapper = shallow(
    <Modal/>
  );

  expect(wrapper.find(".modal-subtext").text()).toEqual("");
});


it('sets the specified button text', () => {
  const wrapper = shallow(
    <Modal
      buttonText="Test Button"
    />
  );

  expect(wrapper.find("button").text()).toEqual("Test Button");
});


it('calls the onConfirm handler when the button is clicked', () => {
  const mockOnConfirm = jest.fn();

  const wrapper = shallow(
    <Modal
      onConfirm={mockOnConfirm}
    />
  );

  const button = wrapper.find("button");
  button.simulate('click');

  expect(mockOnConfirm.mock.calls.length).toEqual(1);
});
