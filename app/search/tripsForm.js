import { useState } from 'react';
import "./tripsForm.css";

const TripForm = () => {

    const [title, setTitle] = useState('')
    const [pickup, setPickup] = useState('Select Location')
    const [dropoff, setDropoff] = useState('Select Destination')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)

    const locations = ["UCLA", "USC", "LAX", "Santa Monica", "Sawtelle", "Koreatown", "Little Tokyo", "Union Station"];
    const destinations = ["UCLA", "USC", "LAX", "Santa Monica", "Sawtelle", "Koreatown", "Little Tokyo", "Union Station"];

    const handleSubmit = async (e) => {
        e.preventDefault()

        const trip = { title, pickup, dropoff, date, time, comment }

        const response = await fetch('http://localhost:4000/api/trips', {
            method: 'POST',
            body: JSON.stringify(trip),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setTitle('')
            setPickup('Select Location')
            setDropoff('Select Destination')
            setDate('')
            setTime('')
            setComment('')
            console.log('new workout added:', json)
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a Ride</h3>

            <label>Trip Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label className="pickupDrop">
                <div>
                    <label>Pickup Location:</label>
                    <select
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                    >
                        <option value="Select Location">Select Location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Dropoff Location:</label>
                    <select
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                    >
                        <option value="Select Destination">Select Destination</option>
                        {destinations.map((destination, index) => (
                            <option key={index} value={destination}>{destination}</option>
                        ))}
                    </select>
                </div>
            </label>
            <label>Date:</label>
            <input
                type="text"
                onChange={(e) => setDate(e.target.value)}
                value={date}
            />

            <label>Time:</label>
            <input
                type="text"
                onChange={(e) => setTime(e.target.value)}
                value={time}
            />

            <label>Comment:</label>
            <input
                type="text"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />

            <button>Add Trip</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TripForm