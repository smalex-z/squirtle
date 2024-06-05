require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const tripRoutes = require('./routes/trips')
const authRoutes = require('./routes/auth')

// express app
const app = express()

// middleware
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// routes
app.use('/api/trips', tripRoutes)
app.use('/api/auth', authRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI) //, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.error(err)
  })
