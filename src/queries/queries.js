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
      id
      name
  }
`
const deleteItemMutation = gql `
mutation($itemId: ID!) {
    id
    name
}
`
const updateItemMutation = gql `
mutation($eventId: ID!, $name: String!) {
    id
    name
}
`


export { getRequestedItemsQuery, getEventQuery, getUserQuery, addItemMutation, deleteItemMutation, updateItemMutation }