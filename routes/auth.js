const express = require('express');
const { signup, login } = require('authentication');
const { authentication, validate } = require('validation');

const router = express.Router();

router.route('/login').post(authentication('login'), validate, login);
router.route('/signup').post(authentication('registration'), validate, signup);

module.exports = router;
