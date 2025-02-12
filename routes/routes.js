const express=require('express');
const router=express.Router();
const { addOrUpdateTarget, getUserTargets, deleteTarget, updateScanStatus } = require('../controllers/targetcontroller');
// POST route to add or update a target and associate it with the user
router.post('/targets', addOrUpdateTarget);
// POST route to get all targets for a specific user
router.get('/user/targets', getUserTargets);
// DELETE route to delete a target and remove it from the user's target list
router.delete('/targets', deleteTarget);

//To get the user's Target
router.get('/user/targets', getUserTargets);

// PUT route to update scan_status of a target
router.put('/targets/scan-status', updateScanStatus);


module.exports = router;
