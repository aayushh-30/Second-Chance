const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ['new', 'like new', 'used', 'damaged'],
    required: true,
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
  age_days: {
    type: Number,
    default: 0,
  },
  age_years: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String, // e.g., a URL or file path
  },
  available : {
    type: Boolean,
    default : true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment', 
  }],
},{timestamps : true});

module.exports = mongoose.model('Item', itemSchema);
