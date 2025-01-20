const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstname,lastname, email, password, color, plate, vehicleType, capacity }) => {  
     if (!firstname || !capacity || !password || !email || !color || !plate || !vehicleType ) {
        throw new Error("Missing required fields");
     }

    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            vehicleType,
            capacity
        }
    })
    return captain;
}

