const { User } = require('models');

const { messages } = require('configs');
const { response, errorResponse } = require('utilities');

module.exports = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return response.successResponse(res, messages.auth.signup_success, user);
  } catch (error) {
    return next(new errorResponse('Invalid payload', 400));
  }
};
