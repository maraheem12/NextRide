const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: 3
        },
        lastname: {
            type: String,
            minlength: 5
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    socketID: {
        type: String
    },
    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive'
    },
    vehicle: {
        vehicleType: {
            type: String,   
            required: true,
            enum: ['car', 'bike', 'auto']
        },
       
        color:{
            type: String,
            required: true
        },
        plate:{
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ]
    }},
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
}); 

captainSchema.methods.generateAuthToken = function(){

    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.methods.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;


