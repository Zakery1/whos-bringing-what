import React from 'react';
import SpecificEvent from './SpecificEvent';
import EventMapContainer from '../GoogleMaps/EventMapContainer';
import axios from 'axios';

const url = 'http://localhost:4000'

describe('Specific Event Component', () => {
    const response ={data: {username: "Bob"}};
    const promise = Promise.resolve(response);
  
    beforeAll(() => {
      sinon.stub(axios, 'get').withArgs('/api/user-data').returns(promise);
    });
  
    afterAll(() => {
      axios.get.restore();
    });
    // Test to see if EventMapContainer is being rendered properly
    it('renders the EventMapContainer wrapper', () => {
        const wrapper = shallow(<SpecificEvent match={{params: {id: 1}}}/>);
        expect(wrapper.find(EventMapContainer)).toBeDefined();
    })
    // Test to check if EventMapContainer is being passed down latitude and longitude props
    it('passes longitude and latittude props to EventMapContainer wrapper', () => {
        const wrapper = shallow(<SpecificEvent match={{params: {id: 1}}}/>);
        wrapper.setState({ event: [{latitude: 1, longitude: 2}]});
        expect(wrapper.state().event[0].longitude).toEqual(2)
        expect(wrapper.state().event[0].latitude).toEqual(1)
        // Need to comment out one Event Map container Component for it to work
        let eventmapcontainerWrapper = wrapper.find(EventMapContainer);

        expect(eventmapcontainerWrapper.props().latitude).toEqual(1)
        expect(eventmapcontainerWrapper.props().longitude).toEqual(2)
    })

  it('calls componentDidMount', () => {
    sinon.spy(SpecificEvent.prototype, 'componentDidMount');

    const wrapper = shallow(<SpecificEvent match={{params: {id: 1}}}/>)
    expect(SpecificEvent.prototype.componentDidMount.calledOnce).toEqual(true);
  });

// Stub axios get call on componentDidMount
  it('fetches username', () => {
    const wrapper = shallow(<SpecificEvent match={{params: {id: 1}}}/>);

    expect(wrapper.state().username).toBe("");

    promise.then(() => {
      expect(wrapper.state().username).toEqual(response.data.username);
    });
  });
})