const express=require('express');
const router=express.Router();
const { addOrUpdateTarget, getUserTargets, deleteTarget } = require('../controllers/targetcontroller');
// POST route to add or update a target and associate it with the user
router.post('/targets', addOrUpdateTarget);
// POST route to get all targets for a specific user
router.post('/user/targets', getUserTargets);
// DELETE route to delete a target and remove it from the user's target list
router.delete('/targets', deleteTarget);
module.exports = router;
