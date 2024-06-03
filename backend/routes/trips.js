const express = require('express')
const {
    getTrips,
    getTrip,
    createTrip,
    deleteTrip,
    updateTrip

} = require('../controllers/tripsController')

const router = express.Router()


//get request for all trips
router.get('/', getTrips)

//get request for a single trip
router.get('/:id', getTrip)

// post a new trip
router.post('/', createTrip)

// delete a new trip
router.delete('/:id', deleteTrip)

// update a existing trip
router.patch('/:id', updateTrip)

module.exports = router