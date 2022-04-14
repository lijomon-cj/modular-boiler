'use strict';
const { validationResult } = require('express-validator');
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Invalid payload',
            error: errors.array()
        })
    }
    next();
};
