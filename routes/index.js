const express = require('express');
// Express router
const router = express.Router();
// Import route modules
const auth = require('./auth');
const user = require('./user');
// Define default path
router.use('/auth', auth);
router.use('/user', user);
// Export routes
module.exports = router;
