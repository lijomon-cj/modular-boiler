// Dependencies
const express = require('express');
// Import controllers
const { getAllUsers, getUserProfile } = require('user');
// Express router
const router = express.Router();
// Define routes
router.route('/all').get(getAllUsers);
router.route('/profile').get(getUserProfile);
// Export routes
module.exports = router;
