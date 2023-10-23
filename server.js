require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection




db.on("error", (error) => {
    console.error(`DB couldn't connect.... ${error}`)
})

db.once("open", () => {
    console.log("DB connected successfully")
})

app.use(express.json())

const UsersRoute = require('./routes/users')
// const UsersMiddleRoute = require('./middleware/UserMiddleware')


app.use('/users', UsersRoute)
// app.use('/UserMiddleware', UsersMiddleRoute)


app.listen(3000, () => {
    console.log("Server started")
})