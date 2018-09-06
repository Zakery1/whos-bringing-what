import { gql } from 'apollo-boost';

const getRequestedItemsQuery = gql `
    query($eventId: ID!) {
        requesteditems (eventId: $eventId) {
          id
          name 
          event {
            id
          }
          user {
            id
          }
          spokenfor
        }
      }
`

const getEventQuery = gql `
      query($eventId: ID!) {
          event (eventId: $eventId) {
            id 
            event_name
            cover_photo
            description
            place
            city
            country
            latitude
            longitude
            state
            street
            zip
            start_time
          }
      }
`

const getUserQuery = gql `
    query($eventId: ID!) {
        user (eventId: $eventId) {
            id 
            username
            profile_pic
        }
    }
`
const addItemMutation = gql `
  mutation($eventId: ID!, $userId: ID!, $name: String!) {
      addItem(eventId: $eventId, userId: $userId, name: $name) {
          id
          name
      }
  }
`
const deleteItemMutation = gql `
mutation($itemId: ID!) {
    deleteItem(itemId: $itemId) {
        id
        name
    }
}
`
const updateItemMutation = gql `
mutation($itemId: ID!, $name: String!) {
    updateItem(itemId: $itemId, name: $name) {
        id
        name
    }
}
`


export { getRequestedItemsQuery, getEventQuery, getUserQuery, addItemMutation, deleteItemMutation, updateItemMutation }