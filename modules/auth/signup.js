// Dependencies
const { messages } = require('configs');
const { response, errorResponse } = require('utilities');
// Models
const { User } = require('models');

module.exports = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return response.success(res, messages.auth.signup_success, user);
  } catch (error) {
    return next(new errorResponse('Invalid request', 400));
  }
};
