require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/users")

const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Test get
// app.get('/', (req, res) => {
//     res.json({mssg: "Welcome to the app"})
// })

// Routes
app.use("/api/users", userRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db and listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

