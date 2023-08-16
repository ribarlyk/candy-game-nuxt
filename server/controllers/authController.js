import 'dotenv/config'
import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { getDB } from '../middlewares/dbconnect.js';
import auth from '../middlewares/authenticate.js'

const router = express.Router();

router.post('/register', async (req, res) => {
    const db = getDB()
    const { username, password } = req.body;
    try {
        const user = await db.collection('users').findOne({ username });
        if (user) {
            throw new Error('User exists !')
        }
        if (username.length > 4 && password.length > 5) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.collection('users').insertOne({ username, password: hashedPassword });
            res.status(201).json({ message: 'User created successfully' });

        } else {
            return res.status(500).json({ error: 'Username or password invalid !' });

        }

    } catch (err) {
        const error = err.message
        res.status(500).json({ error });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = getDB()

    try {
        const user = await db.collection('users').findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'User missmatch !' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password missmatch !' });
        }
        const token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '30m' });
        console.log(token)
        await db.collection('users').updateOne(
            { 'username': username },
            {
                $set: { 'token': token }
            }
        );
        res.status(200).json({ token, username });
    } catch (err) {
        const error = err.message
        res.status(500).json({ error });
    }
});

router.get('/logout', auth, async (req, res) => {
    const db = getDB()
    try {
        const username = req.user.username

        await db.collection('users').updateOne(
            { 'username': username },
            { $set: { 'token': '' } }
        );

        res.status(202).json({ message: 'Successfull logout' })
    } catch (err) {
        res.status(401).json({ error: 'Authentication failed' })
    }
})

export { router }
