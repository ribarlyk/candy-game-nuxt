import express from 'express';
import { boardGenerator, moveRowBelowQueue, genericLinesChecker, checkLine, swapColors } from '../middlewares/game.js';
import { getDB } from '../middlewares/dbconnect.js';
import auth from '../middlewares/authenticate.js'

const color = ['yellow', 'green', 'orange', 'red', 'blue', 'purple'];
const router = express.Router();
let board;

let linesMade = []
router.get('/start', auth, async (req, res) => {

    try {
        board = boardGenerator();
        genericLinesChecker(board);
        res.status(200).json({ board });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/update', auth, (req, res) => {
    try {
        console.log('upd')
        let temp = moveRowBelowQueue(board, 10);
        if (temp.length) {
            linesMade.push(temp)
            temp = []
            console.log('upd2')

        }
        console.log(board)
        res.status(200).json({ message: "Updated" });

    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
})

router.post('/playermoves', auth, async (req, res) => {
    const { username, movesCounter, x, y } = req.body
    const db = getDB()
    let points = 0
    try {
        if (x && y) {
            swapColors(board, x, y)
            let arr = [x, y]
            for (let i = 0; i < arr.length; i++) {
                points = checkLine(board, arr[i])
            }
            if (linesMade.length > 0) {
                console.log(points)
                await db.collection('moves').insertOne({ username, Move: movesCounter, moveFrom: x + ' index', moveTo: y + ' index', 'linesMade': linesMade });

            }

            res.status(201).json({ message: 'writed on db', points })

            linesMade = []

        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err })
    }
})
export { router };
// randomaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa !!!