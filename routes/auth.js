const express = require('express');
const { signup, login } = require('auth');

const router = express.Router();

router.route('/login').get(login);
router.route('/signup').post(signup);

module.exports = router;
