import React, { Component } from 'react';
import axios from 'axios';
import Sugar from 'sugar';
import { graphql, compose } from 'react-apollo';
import { getRequestedItemsQuery, getEventQuery, getUserQuery, addItemMutation, deleteItemMutation, updateItemMutation } from '../../queries/queries';
Sugar.Date.extend()

class CreatorSpecificEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // event: props.data.event,
            // requestedItems: props.data.requestedItems,
            user: props.data.user,
            name: '',
            editing: false,
            selectedId: '',
            selectedName: ''
        }
    }

    handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]: value})
    }
    // Creator can add items to requestedItems table
    addItem = () => {
        const eventId = this.props.match.params.id
        if(this.state.name.length) {
            axios.post(`/api/post_requested_item/${eventId}`, {name: this.state.name})
            .then(items => {
                console.log('items',items)
                this.setState({requestedItems: [...this.state.requestedItems].concat(items.data[0]), name: ''})
            }).catch(error => {
                console.log('Axios error POST CreatorSpecificEvent', error)
            })
        }
    }

    // Creator can delete items from requestedItems table 
    deleteItem = (id) => {
        axios.delete(`/api/delete_requested_item/${id}`)
        .then(response => {
            console.log('response',response)
            this.setState({
                requestedItems: response.data
            })
        }).catch(error => {
            console.log('Axios error DELETE deleteItem', error)
        })
    }

    // Set user to be able to edit item
    editItem = (id) => {
        const index = this.state.requestedItems.findIndex(e => e.id === id)
        this.setState({
            selectedId: id,
            selectedName: this.state.requestedItems[index].name,
            editing: !this.state.editing
        })
    }

    cancel = (key) => {
        this.setState((prevState)=> {
            return {
              editing: !prevState.editing,
              selectedId: '',
              [key]: !prevState[key]
            }
        })
      }

     // Creator can edit items from requestedItems table
    saveItem = (id) => {
        const eventId = this.props.match.params.id
        axios.patch(`/api/patch_requested_item/${id}/${eventId}`, {name: this.state.selectedName})
        .then(response => {
            this.setState({
                selectedId: '',
                selectedName: '',
                editing: !this.state.editing,
                requestedItems: response.data
            })
        })
    }
    render() {
        console.log('this.props', this.props.data)
        return <div>Hello</div>
        // const { event, requestedItems, name, editing, selectedId, selectedName } = this.state
        // const displayRequestedItems = requestedItems.map((item,i) => {
        //     return(
        //         <div className='requested_items' key={i}>
        //             <table id="t">
        //                 <thead>
        //                      <tr>
        //                         <th>
        //                         <div className='requested_items_grid'>
        //                         {editing ? selectedId == item.id ? <input name='selectedName' value={selectedName} onChange={(e) => this.handleInput(e)}/> : <p>{item.name}</p> : <p>{item.name}</p>}
        //                         </div>
        //                         </th>
        //                      </tr>
        //                  </thead>
        //                  <tbody>
        //                      <tr>
        //                         <td>
        //                         {editing ? selectedId == item.id ? <button className='myButton' onClick={() => this.saveItem(item.id)}>Save</button> : <button className='myButton' onClick={() => this.editItem(item.id)}>Edit</button> : <button className='myButton' onClick={() => this.editItem(item.id)}>Edit</button>}
        //                         {editing && selectedId == item.id ? <button className='myButton' onClick={() => this.cancel(item.id)}>Cancel</button> : ''}                   
        //                         <button className='myButton' onClick={() => this.deleteItem(item.id)}>Delete</button>
        //                         </td>
        //                      </tr>
        //                     </tbody>
        //                  </table>
        //         </div>
        //     )
        // })
        // return (
            
        //     <div className="creator_event_parent">
        
        //     {this.props.data.loading 
        //     ? 
        //     <p>Loading Event...</p>
        //     :
        //     <div className='specific_event'>
        //         <h1 className='specific_event_name'>{event[0].event_name}</h1>
        //         <img className='specific_event_event_photo' src={event[0].cover_photo} alt="Displaying event portrait"/>
        //         <p>Description: {event[0].description ? event[0].description : 'No description written'}</p>
        //         <p>Start Time: {new Date().long(event[0].start_time)}</p>
        //         <p>Place: {event[0].place ? event[0].place : 'No place given'}</p>
        //         <p>Street: {event[0].street ? event[0].street : 'No street given'}</p>
        //         <p>City: {event[0].city ? event[0].city : 'No city given'}</p>
        //         <p>State: {event[0].state ? event[0].state : 'No state given'}</p>
        //         <p>Zip: {event[0].zip ? event[0].zip : 'No zipcode given'}</p>
        //         <p>Country: {event[0].country ? event[0].country : 'No country given'}</p>
                

        //     </div>
        //     }
        //     <div className='specific_event_table'>
        //     <h1>Requested Items:</h1>
        //     <div className='specific_event_item'>
        //     {this.props.data.loading ? 'Loading Items...' : displayRequestedItems}
        //     </div>
        //     <input onChange={(e) => this.handleInput(e)} name='name' value={name} type='text' placeholder="Add item" />
        //     <button className='myButton' onClick={() => this.addItem()}>Add Item</button>
        //     </div>
        //     </div>
           
        // );
    }
} 
export default compose(
    graphql(getRequestedItemsQuery, {
        options: props => ({variables: {eventId: props.match.params.id}})
    }),
    graphql(getEventQuery, {
        options: props => ({variables: {eventId: props.match.params.id}})
    }),
    graphql(getUserQuery, {
        options: props => ({variables: {eventId: props.match.params.id}})
    }),
    graphql(addItemMutation, {name: "addItemMutation,"}),
    graphql(deleteItemMutation, {name: "deleteItemMutation,"}),
    graphql(updateItemMutation, {name: "updateItemMutation,"})
)(CreatorSpecificEvent);
