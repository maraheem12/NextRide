const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "Last name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minLength: [3, "Last name must be at least 3 characters long"],
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [6, "Last name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle:{

    capacity:{
        type: Number,
        required: true,
        min :[1, "capacity must be at least 1"],
    },
    plate:{
        type: String,
        required: true,
        minLength: [3, "plate must be at least 3 characters long"],
    },
    color:{
        type: String,
        required: true,
        minLength: [3, "color must be at least 3 characters long"],
    },
    vehicleType:{
        type: String,
        required: true,
        enum: ["car", "motorcycle", "auto"],
    },
},
location:{
    latitude:{
        type: Number,
    },
    longitude:{
        type: Number,
    }
},
  
});

captainSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

captainSchema.methods.hashPassword= async function (password) {
    return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;
