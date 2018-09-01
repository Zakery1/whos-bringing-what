module.exports = {
    user: [{id: 3, username: "Zak Graham"}],
    requestedItems: [
        {
          itemName: "pizza",
          userId: 5
          },
          {
            itemName: "ice",
                userId: 3
            }
        ],
        
    findMyItems: () => {
        let userId = this.user[0].id
        const newArray = requestedItems.filter((item) => item.userId === userId)
        return newArray
        }
}


