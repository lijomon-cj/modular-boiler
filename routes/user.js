require('module-alias/register')

const express = require('express');
const { getAllUsers, getUserProfile } = require('@user');

const router = express.Router();

router.route('/all').get(getAllUsers)
router.route('/profile').get(getUserProfile)

module.exports = router;