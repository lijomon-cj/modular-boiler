// Dependencies
const express = require('express');
// Import controllers
const { signup, login } = require('authentication');
const { authentication, validate } = require('validation');
// Express router
const router = express.Router();
// Define routes
router.route('/login').post(authentication('login'), validate, login);
router.route('/signup').post(authentication('registration'), validate, signup);
// Export router
module.exports = router;
