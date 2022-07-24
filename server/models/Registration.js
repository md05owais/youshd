const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserDetails = mongoose.Schema({
  FullName: {
    type: String,
    allowNull: false,
  },

  Email: {
    type: String,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: String,
    allowNull: false,
  },
});

UserDetails.plugin(uniqueValidator);
module.exports = mongoose.model("UserDetails", UserDetails);
