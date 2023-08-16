import express from 'express'
import auth from "../middlewares/authenticate.js"
import { getDB } from "../middlewares/dbconnect.js";
const router = express.Router();

router.post('/saveresult', auth, async (req, res) => {
    const { date, points } = req.body;
    const db = getDB()

    const username = req.user.username
    try {

        await db.collection('results').insertOne({ date, username, points });

        res.status(201).json({ message: 'Points stored successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/getresult', auth, async (req, res) => {
    const username = req.user.username;
    const db = getDB()
    console.log(username);
    try {
        const result = await db.collection('results').find({ username }).toArray();
        console.log(result);
        if (result.length === 0) {
            console.log(result);
            return res.status(409).json({ error: 'No data' });
        }
        res.status(201).json({ message: 'Points retrieved successfully', result });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router }
