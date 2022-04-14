const express = require('express');
const { signup, login } = require('auth');
const { authentication, validate } = require('validation');

const router = express.Router();

router.route('/login').post(authentication('login'), validate, login);
router.route('/signup').post(signup);

module.exports = router;
