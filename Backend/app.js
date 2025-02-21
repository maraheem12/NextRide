const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/captains', captainRoutes); 
app.use(express.urlencoded({ extended: true}));
connectToDb();


module.exports = app;