'use strict';
const {
    body,
} = require('express-validator');

module.exports = (controller = '') => {
    let rules = [];
    switch (controller) {
        case 'login': {
            return [
                body('username')
                    .trim()
                    .normalizeEmail()
                    .not()
                    .isEmpty()
                    .withMessage('Email cannot be left blank')
                    .bail()
                    .isEmail()
                    .withMessage('Email is not valid'),
                body('password')
                    .trim()
                    .not()
                    .isEmpty()
                    .withMessage('Password cannot be left blank'),
            ];
        };
        case 'registration': {
            return [
                body('username')
                    .trim()
                    .normalizeEmail()
                    .not()
                    .isEmpty()
                    .withMessage('Email cannot be left blank')
                    .bail()
                    .isEmail()
                    .withMessage('Email is not valid'),
                body('password')
                    .trim()
                    .not()
                    .isEmpty()
                    .withMessage('Password cannot be left blank'),
            ];
        };
    }
}