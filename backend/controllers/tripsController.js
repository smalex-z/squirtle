const Trip = require('../models/TripModel')
const mongoose = require('mongoose')

//get request for all trips
const getTrips = async (req,res) => {
    try{
        const trips = await Trip.find({}).sort({createdAt: -1})
        res.status(200).json({trips})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

//get request for a single trip
const getTrip = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Trip not found'})
    }

    const trip = await Trip.findById(id)
    
    if(!trip){
        res.status(404).json({message: 'Trip not found'})
    }

    res.status(200).json({trip})
}

// post (create) a new trip
const createTrip = async (req,res) => {
    const {title, pickup, dropoff, date, time, comment, owner} = req.body

    try{
        const trip = await Trip.create({title, pickup, dropoff, date, time, comment, owner, riders: [owner]})
        res.status(200).json({trip})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

// delete a new trip

const deleteTrip = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Trip not found'})
    }

    const trip = await Trip.findOneAndDelete({_id: id})

    if(!trip){
        res.status(400).json({message: 'Trip not found'})
    }

    res.status(200).json({message: 'Trip deleted successfully'})
}

// update a existing trip
const updateTrip = async (req, res) => {
    const { id } = req.params;
    const { riderId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Trip not found Err1' });
    }

    try {
        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found Err2' });
        }

        // Check if riderId is provided and if it's already in the array
        if (riderId && !trip.riders.includes(riderId)) {
            trip.riders.push(riderId);
        }

        await trip.save();

        res.status(200).json({ trip });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const leaveTrip = async (req, res) => {
    const { id } = req.params;
    const { riderId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Trip not found Err1' });
    }

    try {
        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found Err2' });
        }

        // Check if riderId is provided and if it's in the array
        if (riderId && trip.riders.includes(riderId)) {
            trip.riders = trip.riders.filter(id => id.toString() !== riderId);
        }

        await trip.save();

        res.status(200).json({ trip });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getTrips, 
    getTrip, 
    createTrip,
    deleteTrip,
    updateTrip,
    leaveTrip
}