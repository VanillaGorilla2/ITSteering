const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/users')
const Project = require('./models/projects')
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://0.0.0.0/myDatabase');

app.get('/getUsers', (req, res) => {
    User.find().then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getProjects', (req, res) => {
    Project.find().then(projects => res.json(projects))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("server is running")
})