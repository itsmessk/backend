const mongoose = require('mongoose');

// Define the Target schema
const targetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,  // Store userId as a string
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now, // Automatically set the date when the target is added
  },
});

// Create the Target model
const Target = mongoose.model('Target', targetSchema);

module.exports = Target;
