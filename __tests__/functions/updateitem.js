const axios  = require('axios')

module.exports = {
    updateItem: (url) => {
        return axios.patch(url, {name: 'Chicken'})
        .then(res => {
            return res.data
        })
        .catch(err => err)
    } 
}
