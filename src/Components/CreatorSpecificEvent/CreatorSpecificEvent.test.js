import React from 'react';


import { cancel, creatorEvent } from  './CreatorSpecificEvent';
// components 
import  { CreatorSpecificEvent } from './CreatorSpecificEvent';



// Testing Cancel functionality
describe('Pure Function Cancel', () => {
  it('should change editing and seletedId', () => {
    const state = { editing: true, selectedId: 5 }
    const newState = cancel(state)

    expect(newState.editing).toBeFalsy()
    expect(newState.selectId).toBeUndefined()
  })
})


// Find button that adds an Item and see if it setState properly
describe('CreatorSpecificEvent', () => {
  it('should clear certain states through setState', () => {
    const wrapper = shallow(
  <CreatorSpecificEvent  addItemMutation={() => "hello"} data={{loading: true, user: {id: 1}}} match={{params: {id: 1}}} getRequestedItemsQuery={{requesteditems: [1,2,3]}}/>);
    wrapper.setState({name: "Bob"});
    wrapper.find('#addButton').simulate('click');
    expect(wrapper.state().name).toBeFalsy();
  });
});



