import nextConnect from 'next-connect';
import { connectToDatabase } from '../../database';

const handler = nextConnect();

handler.post(async (req, res) => {
    const { username, password } = req.body;

    const db = connectToDatabase();

    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            res.status(500).json({ success: false });
            throw error;
        }

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

export default handler;