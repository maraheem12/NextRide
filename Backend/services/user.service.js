const userModel = require("../models/user.model");

module.exports.createUser = async ({ firstname, lastname, email, password }) => {  
  if (!firstname || !password || !email) {
      throw new Error("Missing required fields");
  }

  const user = await userModel.create({
      fullname: {
          firstname,
          lastname
      },
      email,
      password
  });
  return user;

}