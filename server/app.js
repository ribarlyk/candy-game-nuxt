import 'dotenv/config'
import bodyParser from 'body-parser';
import cors from 'cors'
import express from 'express'
import { dbconnect } from './middlewares/dbconnect.js'
import { router as authController } from './controllers/authController.js'
import { router as resultController } from './controllers/scoresController.js'
import { router as boardController } from './controllers/boardController.js'
const app = express();
const port = process.env.PORT ?? 3003;


(async () => {
    try {
        await dbconnect()
        app.use(bodyParser.json());
        app.use(cors());

        app.use('/auth', authController);
        app.use('/results', resultController);
        app.use('/board', boardController);

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (err) { console.log(err) }
})()





