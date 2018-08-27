module.exports = {
    readUser: (req, res) => {
        res.status(200).json({
          username: req.session.user.username,
          profilePicture: req.session.user.profile_pic,
          userId: req.session.user.id
        })
    },
} 