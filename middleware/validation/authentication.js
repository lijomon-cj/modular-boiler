'use strict';
const { body } = require('express-validator');

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
    }
    case 'registration': {
      return [
        body('firstName')
          .trim()
          .not()
          .isEmpty()
          .withMessage('firstName cannot be left blank'),
        body('lastName')
          .trim()
          .not()
          .isEmpty()
          .withMessage('lastName cannot be left blank'),
        body('email')
          .trim()
          .normalizeEmail()
          .not()
          .isEmpty()
          .withMessage('email cannot be left blank')
          .bail()
          .isEmail()
          .withMessage('email is not valid'),
        body('password')
          .trim()
          .not()
          .isEmpty()
          .withMessage('password cannot be left blank'),
      ];
    }
  }
};
