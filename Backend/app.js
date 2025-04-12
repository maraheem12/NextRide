const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const cors = require('cors');
connectToDb = require('./db/db.js');
const userRouters = require('./routes/user.routes');
const captainRouters = require('./routes/captain.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



connectToDb();





app.use('/users', userRouters);
app.use('/captains', captainRouters);





app.get('/', (req, res) => {
    res.send('Hello World!');
});



module.exports = app;