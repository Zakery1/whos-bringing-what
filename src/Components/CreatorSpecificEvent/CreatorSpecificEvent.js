import React, { Component } from 'react';
import Sugar from 'sugar';
import { graphql, compose } from 'react-apollo';
import { getRequestedItemsQuery, getEventQuery, getUserQuery, addItemMutation, deleteItemMutation, updateItemMutation } from '../../queries/queries';
const get = require('lodash/get');
Sugar.Date.extend()

export const cancel = (prevState) => ({
    editing: !prevState.editing,
    selectedId: ''
})

class CreatorSpecificEvent extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            editing: false,
            selectedId: '',
            selectedName: '',
            deleteWarning: false
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
        this.props.addItemMutation({
            variables: {
                name: this.state.name, 
                eventId, 
                userId: this.props.data.user.id
            },
            refetchQueries: [{query: getRequestedItemsQuery, variables: {eventId: this.props.match.params.id}}]
        })
        this.setState({name: ''})
    }

    // Creator can delete items from requestedItems table 
    deleteItem = (itemId) => {
        this.props.deleteItemMutation({
            variables: {
                itemId
            },
            refetchQueries: [{query: getRequestedItemsQuery, variables: {eventId: this.props.match.params.id}}]
        })
    }


    // Set user to be able to edit item
    editItem = (id) => {
        const index = this.props.getRequestedItemsQuery.requesteditems.findIndex(e => e.id === id)
        this.setState({
            selectedId: id,
            selectedName: this.props.getRequestedItemsQuery.requesteditems[index].name,
            editing: !this.state.editing
        })
    }

    cancel = () => {
        this.setState(cancel)
    }

     // Creator can edit items from requestedItems table
    saveItem = (itemId) => {
        this.props.updateItemMutation({
            variables: {
                itemId,
                name: this.state.selectedName 
            },
            refetchQueries: [{query: getRequestedItemsQuery, variables: {eventId: this.props.match.params.id}}]
        })
            this.setState({
                selectedId: '',
                selectedName: '',
                editing: !this.state.editing
            })
    }
    render() {
        // console.log('this.props.user', this.props.data.user)
        // console.log('this.props.items', this.props.getRequestedItemsQuery.requesteditems)
        // console.log('this.props.event', this.props.getEventQuery.event)

        const { name, editing, selectedId, selectedName } = this.state

        const displayRequestedItems = this.props.getRequestedItemsQuery.requesteditems ? this.props.getRequestedItemsQuery.requesteditems.map(item => {
            return(
                <div className='requested_items' key={item.id}>
                     
                             <div className='requested_items_grid'>
                             {editing ? selectedId == item.id ? <input name='selectedName' value={selectedName} onChange={(e) => this.handleInput(e)}/> : <p>{item.name}</p> : <p>{item.name}</p>}
                             </div>
                
                             {editing ? selectedId == item.id ? <button className='myButton' onClick={() => this.saveItem(item.id)}>Save</button> : <button className='myButton' onClick={() => this.editItem(item.id)}>Edit</button> : <button className='myButton' onClick={() => this.editItem(item.id)}>Edit</button>}
                             {editing && selectedId == item.id ? <button className='myButton' onClick={() => this.cancel()}>Cancel</button> : ''}                   
                             <button className='myButton' onClick={() => this.deleteItem(item.id)}>Delete</button>
                        
                </div> 
            )
        }) : ''
        return (
            
            <div className="creator_event_parent">
        
            {this.props.data.loading 
            ? 
            <p>Loading Event...</p>
            :
            <div className='specific_event'>
                <h1 className='specific_event_name'>{get(this.props, "getEventQuery.event.event_name", "No Event Name given") }</h1>
                <img className='specific_event_event_photo' src={get(this.props, "getEventQuery.event.cover_photo", "")} alt="Displaying event portrait"/>
                <p>Description: {get(this.props, "getEventQuery.event.description", 'No description written')}</p>
                <p>Start Time: {new Date().long(get(this.props, "getEventQuery.event.start_time", ""))}</p>
                <p>Place: {get(this.props, "getEventQuery.event.place", 'No place given' )}</p>
                <p>Street: {get(this.props, "getEventQuery.event.street", 'No street given')}</p>
                <p>City: {get(this.props, "getEventQuery.event.city", 'No city given')}</p>
                <p>State: {get(this.props, "getEventQuery.event.state", 'No state given')}</p>
                <p>Zip: {get(this.props, "getEventQuery.event.zip", 'No zip code given' )}</p>
                <p>Country: {get(this.props, "getEventQuery.event.country",'No country given')}</p>

            </div>
            }
            <div className='specific_event_table'>
            <h1 className="specific_items_title">Requested Items:</h1>
            <div className='specific_event_item'>
            {this.props.data.loading ? 'Loading Items...' : displayRequestedItems.length ? displayRequestedItems : "Type item and click add item!"}
            </div>
            <input onChange={(e) => this.handleInput(e)} name='name' value={name} type='text' placeholder="Add item" />
            <button id='addButton' type="button" className='myButton' onClick={() => this.addItem()}>Add Item</button>
            </div>
            </div>
           
        );
    }
} 

export default compose(
    graphql(getRequestedItemsQuery, {
        options: props => ({variables: {eventId: props.match.params.id}}),
        name: "getRequestedItemsQuery"
    }),
    graphql(getEventQuery, {
        options: props => ({variables: {eventId: props.match.params.id}}),
        name: "getEventQuery"
    }),
    graphql(getUserQuery, {
        options: props => ({variables: {eventId: props.match.params.id}})
    }),
    graphql(addItemMutation, {name: "addItemMutation"}),
    graphql(deleteItemMutation, {name: "deleteItemMutation"}),
    graphql(updateItemMutation, {name: "updateItemMutation"})
)(CreatorSpecificEvent);

export { CreatorSpecificEvent };