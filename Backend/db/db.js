const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('Connected to MongoDB database');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
module.exports = connectToDb;   

// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }