'use strict';
const { validationResult } = require('express-validator');
const { response } = require('utilities');
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response.badRequest(res, '', errors.array())
    }
    next();
};
