const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const getSubscriber = require('../middleware/UserMiddleware')




// Get all Users
router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    }
    catch (err) {
        res.status(500).json({ message: err.message })        
    }
})

// Get a single user
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.User)    
})


// Add new users

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
})


// Update Users

router.put('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.User.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.User.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.User.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete users


router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        res.json({ message: "Deleted Subscriber"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;



// WRITING THE MIDDLEWARE

// async function getSubscriber(req, res, next) {
//     try{
//         const user = await User.findById(req.params.id)
//         if (user == null) {
//             return res.status(404).json({ message: "Cannot find subscriber"})
//         }

//     res.User = user
//     next()

//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }
// }


