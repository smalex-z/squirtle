const mongoose = require('mongoose');

const Schema = mongoose.Schema

const tripSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    dropoff: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    riders: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }]

}, {timestamps: true}) 

module.exports = mongoose.model('Trip', tripSchema)

