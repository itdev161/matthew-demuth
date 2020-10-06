import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';

const app = express();


connectDatabase();

//configure middleware
app.use(express.json({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

//API endpoints
/**
 * @route GET /
 * @desc Test endpoint
 */
app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')    
);

/**
 * @route POST api/users
 * @desc Register user
 */

app.post(
    '/api/users', 
    [
        check('name', 'Please enter your name').not().isEmpty,
        check('email', 'Please enter your email').isEmail(),
        check('password', 'Please enter your password with 6 or more characters').isLength({min: 6})
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }else{
            return res.send (req.body)
        }
    }
);

const port = 5000;
app.listen(5000, () => console.log ('Express server running on port 5000'));