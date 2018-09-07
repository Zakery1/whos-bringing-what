import React from 'react';
import { shallow, mount, render } from 'enzyme';

// components 
import About from './About';


describe('About rendered', () => {
  it('should render correctly in "debug" mode', () => {
    const wrapper = shallow(<About debug />);
    console.log(wrapper)
    expect(wrapper).toMatchSnapshot();
  });
});
