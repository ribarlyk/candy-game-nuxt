import 'dotenv/config'
import jwt from 'jsonwebtoken';
export default (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
        console.log('fail')
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
    }
};