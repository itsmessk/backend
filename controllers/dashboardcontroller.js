const Target = require('../models/targetModel'); // Import the Target model
const User = require('../models/userModel'); // Import the User model

const targetcount = async (req, res) => {
    try {
        const { userId } = req.query;

        // Find user and populate target IDs
        const user = await User.findOne({ userId }).populate('targetIds');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch count only for the user's targets
        const totalTargets = user.targetIds.length;
        const notScannedCount = await Target.countDocuments({ _id: { $in: user.targetIds }, scan_status: 'not scanned' });
        const scanningCount = await Target.countDocuments({ _id: { $in: user.targetIds }, scan_status: 'scanning' });
        const completedCount = await Target.countDocuments({ _id: { $in: user.targetIds }, scan_status: 'completed' });
        const failedCount = await Target.countDocuments({ _id: { $in: user.targetIds }, scan_status: 'failed' });
        const latestTargets = await Target.find({ _id: { $in: user.targetIds } })
            .sort({ addedAt: -1 }) // Sort by `addedAt` in descending order (latest first)
            .limit(5); // Limit to 5 results


        // Send response
        res.status(200).json({
            totalTargets,
            scanningCount,
            completedCount,
            failedCount,
            notScannedCount,
            latestTargets
        });
    } catch (error) {
        console.error('Error fetching target counts:', error);
        res.status(500).json({ message: 'Error fetching target counts', error: error.message });
    }
};

module.exports = { targetcount };
