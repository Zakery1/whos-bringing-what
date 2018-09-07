import React from 'react';
import { shallow, mount, render } from 'enzyme';
// import sinon from 'sinon';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


// components 
import CreatorSpecificEvent from './CreatorSpecificEvent';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});




describe('CreatorSpecificEvent rendered', () => {

  it('should render correctly in "debug" mode', () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <CreatorSpecificEvent location={ '/creatorSpecificEvent' } match={{params: {id: 1}}}/>
      </ApolloProvider>)
      // console.log(wrapper)
      expect(wrapper).toMatchSnapshot();
  });

});

// Notes for Jest / Enzyme 

// Test a pure function, most likely a cancel function or a setState  function 
// Test specific event component to see if it is rendering a child component, Google Map 
// Test to see if Google map is being passed down the proper props 
// Test button click to properly setState 
// Implement sinon to stub a promise and test to see if stub works