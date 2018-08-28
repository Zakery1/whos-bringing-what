const axios = require('axios')

module.exports = {
    login: (req, res) => {
        const payload = {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `https://${req.headers.host}/auth/callback`
        };

        const dbInstance = req.app.get('db');

        function tradeCodeForAccessToken() {
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
        }

        function tradeAccessTokenForUserInfo(response) {
            const accessToken = response.data.access_token
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`)
        }

        function storeUserInfoInDataBase(response){
            const auth0id = response.data.sub
            return dbInstance.read_user_by_auth0_id(auth0id).then(users => {
                if (users.length) {
                    const user = users[0]
                    req.session.user = user;
                    res.redirect('/feed');
                } else {
                    const createUserData = {
                        auth0id,
                        email: response.data.email,
                        username: response.data.name,
                        profilePicture: response.data.picture
                    }
                 return dbInstance.create_user(createUserData).then(newUsers => {
                     const user = newUsers[0];
                     req.session.user = user;
                     res.redirect('/feed');
                 })
                }
            })
        }
        tradeCodeForAccessToken()
        .then(tradeAccessTokenForUserInfo)
        .then(storeUserInfoInDataBase)
        .catch(error => {
            console.log('---- error with login', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })

    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).redirect('/');
    },
    createRequestedItem: (req, res) => {
        const dbInstance = req.app.get('db')
        const { eventId } = req.params 
        const { name } = req.body
        dbInstance.create_item({
            name,
            eventId,
            userId: req.session.user.id,
            spokenfor: false
        })
        .then(items => {
            res.status(200).json(items)
        }).catch(error => {
            console.log('---- error with createRequestedItem', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    deleteRequestedItem: (req, res) => {
        const dbInstance = req.app.get('db')
        const { itemId, eventId } = req.params
        dbInstance.delete_item([itemId])
        .then(() => {
            dbInstance.read_items([eventId])
            .then(items => {
                res.status(200).json(items)
            })
        }).catch(error => {
            console.log('---- error with deleteRequestedItem', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },

}