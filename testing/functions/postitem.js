const axios  = require('axios')

module.exports = {
    postItem: (url) => {
        return axios.post(url, {name: 'Chicken'})
        .then(res => {
            return res.data
        })
        .catch(err => err)
    } 
}