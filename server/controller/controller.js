const sgMail = require('@sendgrid/mail');

module.exports = {
    readUser: (req, res) => {
        res.status(200).json({
          id: req.session.user.id,
          username: req.session.user.username,
          email: req.session.user.email,
          profilePicture: req.session.user.profile_pic
        })
    },
    readUserWithAuth0Id: (req, res) => {
        const dbInstance = req.app.get('db')
        const userId = req.session.user.id
        dbInstance.read_user({userId})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
    },
    // Checking to see if events.creator_id === users.auth0_id 
    readCreatedEvents: (req, res) => {
        const dbInstance = req.app.get('db')
        const userId = req.session.user.id
        dbInstance.read_user({userId})
        .then(users => {
            const auth0Id = users[0].auth0_id
            dbInstance.read_created_events({auth0Id})
            .then(events => {
                res.status(200).json(events)
            })
        }).catch(error => {
            console.log('---- error with readEvents', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    // Get all events that users is invited to through the invitations table
    readInvitedEvents: (req, res) => {
        const dbInstance = req.app.get('db')
        const userId = req.session.user.id
        dbInstance.read_user({userId})
        .then(users => {
            const userId = users[0].id
            dbInstance.read_invited_events({userId})
            .then(events => {
                res.status(200).json(events)
            })
        }).catch(error => {
            console.log('---- error with readEvents', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    readEvent: (req, res) => {
        const dbInstance = req.app.get('db')
        const { eventId } = req.params
        dbInstance.read_event({eventId})
        .then(events => {
            res.status(200).json(events)
        }).catch(error => {
            console.log('---- error with readEvent', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    readRequestedItems: (req, res) => {
        const dbInstance = req.app.get('db')
        const { eventId } = req.params
        dbInstance.read_items({eventId})
        .then(items => {
            res.status(200).json(items)
        })
        .catch(error => {
            console.log('---- error with  readRequestedItems', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    readUsersInvitedEvent: (req, res) => {
        const dbInstance = req.app.get('db')
        const { eventId } = req.params
        dbInstance.read_users_invited_event({eventId})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log('---- error with readUsersInvitedEvent', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    
    readUsersInvitedEventEmail: (req, res) => {
        const sender  = req.session.user.email
        const { subject, text  } = req.body
        const dbInstance = req.app.get('db')
        const { eventId } = req.params
        dbInstance.read_users_invited_event(+eventId)
        .then(users => {
            const emailArray = users.map(user => user.email)
            const msg = {
                to: emailArray,  //recipient
                from: sender,
                subject: topic,
                text: text
            }
            sgMail.send(msg)

            res.send('success!')
        })
        .catch(error => {
            console.log('---- error with readUsersInvitedEvent', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    }
} 