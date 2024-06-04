import nextConnect from 'next-connect';
import { connectToDatabase } from '../../database';

const handler = nextConnect();

handler.post(async (req, res) => {
    console.log("here")
    console.log(req.body)
    const { firstName, lastName, username, password } = req.body;

    const db = connectToDatabase();

    db.query('INSERT INTO users (firstName, lastName, username, password) VALUES (?, ?, ?, ?)', [firstName, lastName, username, password], (error, results) => {
        if (error) {
            res.status(500).json({ success: false });
            throw error;
        }

        res.json({ success: true });
    });
});

export default handler;