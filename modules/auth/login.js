// Dependencies
const passport = require('passport');
const { response, errorResponse } = require('utilities');
const { messages } = require('configs');

module.exports = async (req, res, next) => {
  try {
    passport.authenticate('local', async function (_err, user) {
      if (!user) return response.notFound(res, messages.auth.invalid_login);
      const token = await user.generateToken();
      return response.success(res, messages.auth.logged_in, {
        userId: user._id,
        token
      });
    })(req, res, next);
  } catch (error) {
    console.log(error);
    return next(new errorResponse('Error fetching user details', 500));
  }
};
