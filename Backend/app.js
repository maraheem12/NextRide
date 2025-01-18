const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

app.use(cors());
app.use('/users', userRoutes);
app.use(express.urlencoded({ extended: true}));
connectToDb();

app.get('/', (req, res) =>{
    res.send('Hello World!');
});

module.exports = app;