const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[6-9]\d{9}$/,
      'Please fill a valid 10-digit Indian phone number',
    ],
  },
  full_name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength : 6,
  },
  verified: {
    type: Boolean,
    default : false,
  },
  address : {
    house : {
        type : String,
        required : true,
    },
    lane : {
        type : String,
        required : true
    },
    zip : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    }
  },
  isActive : {
    type : Boolean,
    default : true
  },
},{timestamps : true});

module.exports = mongoose.model('User', userSchema);
