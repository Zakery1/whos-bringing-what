module.exports = {
    readUser: (req, res) => {
        res.status(200).json({
          id: req.session.user.id,
          username: req.session.user.username,
          email: req.session.user.email,
          profilePicture: req.session.user.profile_pic
        })
    },
    // Checking to see if events.creator_id === users.auth0_id 
    readCreatedEvents: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.read_user([req.session.user.id])
        .then(users => {
            dbInstance.read_created_events([users[0].auth0_id])
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
        dbInstance.read_user([req.session.user.id])
        .then(users => {
            dbInstance.read_invited_events([users[0].id])
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
        dbInstance.read_event([eventId])
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
        dbInstance.read_items([eventId])
        .then(items => {
            res.status(200).json(items)
        }).catch(error => {
            console.log('---- error with  readRequestedItems', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
} 