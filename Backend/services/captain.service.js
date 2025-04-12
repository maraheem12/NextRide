const captainModel = require("../models/captain.model");

module.exports.createCaptain = async (captainData) => {
  const { firstname, lastname, email, password, vehicle } = captainData;

  if (!firstname || !lastname || !email || !password || !vehicle) {
    throw new Error("All fields are required");
  }

  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle,
  });
  return captain;
};
