import { useState } from 'react';
import "./tripsForm.css";

const TripForm = () => {

    const [title, setTitle] = useState('')
    const [pickup, setPickup] = useState('')
    const [dropoff, setDropoff] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)

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
            setPickup('')
            setDropoff('')
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

            <label>Pickup Location:</label>
            <input
                type="text"
                onChange={(e) => setPickup(e.target.value)}
                value={pickup}
            />

            <label>Dropoff Location:</label>
            <input
                type="text"
                onChange={(e) => setDropoff(e.target.value)}
                value={dropoff}
            />

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

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TripForm