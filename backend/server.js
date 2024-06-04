require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const tripRoutes = require('./routes/trips')
const cors = require('cors')

// express app
const app = express()

// middleware
app.use(cors({origin:"http://localhost:3000"}))

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/trips', tripRoutes)


//connect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => { // process.env.PORT is the port number from the .ENV file. 
        console.log('connected to db & listening on port', process.env.PORT)
    })
})
.catch((err) => {
  console.log(err)
})


