const Target = require('../models/targetModel'); // Import the Target model
const User = require('../models/userModel'); // Import the User model

// Add or update a target and associate it with the user
const addOrUpdateTarget = async (req, res) => {
  const { name, url, description, userId } = req.body;
  
  if (!name || !url || !description || !userId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try { 
    // Step 1: Create a new target
    const newTarget = new Target({
      name,
      url,
      description,
      userId,
      
    });

    // Save the target
    await newTarget.save();

    //console.log(newTarget._id);
  
    // Step 2: Find user by userId
    let user = await User.findOne({ userId });

    //console.log(user);
  
    if (user) {
      // If user exists, update target list
      user.targetIds.push(newTarget._id); // Add the new target ID
      await user.save();
    } else {
      // If user doesn't exist, create a new user
      user = new User({
        userId,
        targetIds: [newTarget._id], // Add target ID to user's target list
      });
      await user.save();
    }

    // Respond with success message and the created target
    res.status(201).json({
      message: 'Target added and associated with user successfully.',
      target: newTarget,
    });
   
  } catch (error) {
    console.error('Error adding or updating target:', error);
    res.status(500).json({
      message: 'An error occurred while adding or updating the target.',
      error: error.message,
    });
  }
};


// Get all targets for a given userId
const getUserTargets = async (req, res) => {
  const { userId } = req.query; 

  try {
    // Find user by userId and populate the targetIds
    const user = await User.findOne({ userId }).populate('targetIds'); // Populate the targetIds array
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User targets fetched successfully.',
      targets: user.targetIds,
    });
  } catch (error) {
    console.error('Error fetching user targets:', error);
    res.status(500).json({
      message: 'An error occurred while fetching user targets.',
      error: error.message,
    });
  }
};

// Delete a target by ID and remove it from the user's target list
const deleteTarget = async (req, res) => {
  const { userId, targetIds } = req.body; // Expecting an array of targetIds in the request body

  try {
    // Check if targetIds is an array and not empty
    if (!Array.isArray(targetIds) || targetIds.length === 0) {
      return res.status(400).json({ message: 'No target IDs provided.' });
    }

    // Find and delete the targets
    const deletedTargets = await Target.deleteMany({
      _id: { $in: targetIds },
    });

    if (deletedTargets.deletedCount === 0) {
      return res.status(404).json({ message: 'No targets found to delete.' });
    }

    // Find the user and update their targetIds array
    const user = await User.findOne({ userId });
    if (user) {
      // Remove the target IDs from the user's targetIds array
      user.targetIds = user.targetIds.filter(
        (id) => !targetIds.includes(id.toString())
      );
      await user.save();
    }

    res.status(200).json({
      message: `${deletedTargets.deletedCount} target(s) deleted successfully.`,
      deletedTargets,
    });
  } catch (error) {
    console.error('Error deleting targets:', error);
    res.status(500).json({
      message: 'An error occurred while deleting the targets.',
      error: error.message,
    });
  }
};


// Update scan_status of a target
const updateScanStatus = async (req, res) => {
  const { targetId, scan_status } = req.body; // Get targetId and new scan_status from request body

  if (!targetId || !scan_status) {
    return res.status(400).json({ message: 'Target ID and scan status are required.' });
  }

  try {
    const updatedTarget = await Target.findByIdAndUpdate(
      targetId,
      { scan_status },
      { new: true } // Return the updated document
    );

    if (!updatedTarget) {
      return res.status(404).json({ message: 'Target not found.' });
    }

    res.status(200).json({
      message: 'Scan status updated successfully.',
      target: updatedTarget,
    });
  } catch (error) {
    console.error('Error updating scan status:', error);
    res.status(500).json({
      message: 'An error occurred while updating scan status.',
      error: error.message,
    });
  }
};




module.exports = { addOrUpdateTarget, getUserTargets, deleteTarget, updateScanStatus };
