const mongoose = require('mongoose');

function connectToDb(){
    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => console.log("Error connecting"));
}    

module.exports = connectToDb;