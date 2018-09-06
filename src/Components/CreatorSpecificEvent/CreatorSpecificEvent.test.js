import React from 'react';
import { shallow, mount, render } from 'enzyme';

// components 
import CreatorSpecificEvent from './CreatorSpecificEvent';


describe('CreatorSpecificEvent rendered', () => {
  it('should render correctly in "debug" mode', () => {
    const wrapper = shallow(<CreatorSpecificEvent debug />);
    console.log(wrapper)
    expect(wrapper).toMatchSnapshot();
  });
});