// Dependencies
const { messages } = require('configs');
const { response, errorResponse } = require('utilities');
const { getUserByEmail } = require('user');
// Models
const { User } = require('models');

module.exports = async (req, res, next) => {
  try {
    const existingUser = await getUserByEmail(req.body.email)
    if (existingUser) {
      return response.badRequest(res, messages.user.email_already_exist)
    }
    const user = await User.create(req.body);
    const token = await user.generateToken();
      return response.success(res, messages.auth.signup_success, {
        userId: user._id,
        token
      });
  } catch (error) {
    return next(new errorResponse('Invalid request', 400));
  }
};
