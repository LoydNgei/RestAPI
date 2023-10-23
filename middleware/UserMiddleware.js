const User = require('../models/userModel')


async function getSubscriber(req, res, next) {
    try{
        const user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: "Cannot find subscriber"})
        }

    res.User = user
    next()

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = getSubscriber