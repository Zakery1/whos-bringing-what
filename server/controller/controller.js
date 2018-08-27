module.exports = {
    readUser: (req, res) => {
        res.status(200).json({
          username: req.session.user.username,
          profilePicture: req.session.user.profile_pic,
          userId: req.session.user.id
        })
    },
    readCreatedEvents: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.read_user([req.session.user.id])
        .then(users => {
            dbInstance.read_created_events([users[0].id])
            .then(events => {
                console.log('events', events)
                res.status(200).json(events)
            })
        }).catch(error => {
            console.log('---- error with readEvents', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    }
} 