const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true, // Ensure that the userId is unique
    required: true,
  },
  targetIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Target', // Array of target references
    },
  ],
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
