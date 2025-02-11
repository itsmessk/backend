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
  scan_status: {
    type: String,
    default: 'not scanned', // Default value
    enum: ['not scanned', 'scanning', 'completed', 'failed'], // Optional: Restrict possible values
  },

});

// Create the Target model
const Target = mongoose.model('Target', targetSchema);

module.exports = Target;
